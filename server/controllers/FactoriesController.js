// Todo:
// * Change database helpers to promises and run them in parallel

var map = require('async/map')

var Factory = require('../models').Factory;
var User = require('../models').User;
var Score = require('../models').Score;
var routeErr = require('../utils/routeErr.js');

var getUserFromReq = require('./../utils/databaseHelpers').getUserFromReq;
var getFactoryFromSlug = require('./../utils/databaseHelpers').getFactoryFromSlug;

var noAuth = require('./../utils/noAuth.js');

// Route Functions
// ------------------------------------------------------

function getFactoriesSlugs(req, res, next) {
  Factory
    .findAll({attributes: ['slug', 'name']})
    .then(factories => res.json({err: false, factories}))
    .catch(err => routeErr(res, next, err))
}

function getFactoryInfo(req, res, next) {
  Factory
    .find({
      where: {slug: req.params.slug},
      attributes: factoryInfoFields
    })
    .then(factory => res.json({err: false, factory}))
    .catch(err => routeErr(res, next, err))
}

function getEmployees(req, res, next) {
  getUserFromReq(req, (err, user) => {
    if(err) return routeErr(res, next, err)
    getFactoryFromSlug(req.params.slug, (err, factory) => {
      if(err) return routeErr(res, next, err)
      if(
        user.get('access') === 'Master' ||
        user.get('factoryId') === factory.get('id')
      ) {
        User
          .findAll({
            where: {factoryId: factory.get('id')},
            attributes: getEmployeesFields,
            include: [{
              model: Score, as: 'scores',
              attributes: employeeWithScoreFields,
              limit: 5,
            }],
          })
          .then(e => res.json({err: false, employees: e}))
          .catch(err => routeErr(res, next, err))
      } else { noAuth(res) }
    })
  })
}

// Helper Functions
// ------------------------------------------------------



// Exports
// ------------------------------------------------------

module.exports = {
  getSlugs: getFactoriesSlugs,
  getFactoryInfo: getFactoryInfo,
  getEmployees: getEmployees,
}

// SQL Attributes
// ------------------------------------------------------

const factoryInfoFields = ['name', 'slug', 'address']
const getEmployeesFields = [
  'id', 'name', 'accessPin', 'picture', 'lastActivity'
]
const employeeWithScoreFields = [
  'lot', 'userId',
]
