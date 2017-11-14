// Todo:
// * Change database helpers to promises and run them in parallel

var json2csv = require('json2csv')

var Factory = require('../models').Factory;
var User = require('../models').User;
var Score = require('../models').Score;
var Product = require('../models').Product;
var ActionPlan = require('../models').ActionPlan;

var routeErr = require('../utils/routeErr.js');

var getUserFromReq = require('./../utils/databaseHelpers').getUserFromReq;
var getFactoryFromSlug = require('./../utils/databaseHelpers').getFactoryFromSlug;
var downloadAttachmentHeaders = require('./../utils/downloadAttachmentHeaders')

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
  authUserForFactory(req, res, next, (user, factory) => {
    User
      .findAll({
        where: {factoryId: factory.get('id')},
        attributes: getEmployeesFields,
        include: [{
          model: Score, as: 'scores',
          attributes: employeeWithScoreFields,
          limit: 6,
        }],
      })
      .then(e => res.json({err: false, employees: e}))
      .catch(err => routeErr(res, next, err))
  })
}

function getActionPlans(req, res, next) {
  authUserForFactory(req, res, next, (user, factory) => {
    ActionPlan
      .findAll({
        where: {factoryId: factory.get('id')},
        attributes: getActionPlansFields,
        include: [{
          model: Product, as: 'product',
          attributes: getActionPlansProductsFields,
        }, {
          model: Score, as: 'score',
          attributes: getActionPlansScoreFields,
        }],
        limit: 20,
      })
      .then(actionPlans => res.json({err: false, actionPlans}))
      .catch(err => routeErr(res, next, err))
  })
}

function downloadActionPlans(req, res, next) {
  authUserForFactory(req, res, next, (user, factory) => {
    ActionPlan
      .findAll({
        where: {factoryId: factory.get('id')},
        attributes: downloadActionPlansFields,
        include: [{
          model: Score, as: 'score',
          attributes: ['lot', 'totalScore'],
        }, {
          model: Product, as: 'product',
          attributes: ['name'],
        }]
      })
      .then(ap => {
        json2csv({
          data: ap,
          fields: downloadActionPlansCSVFields,
        }, (err, csv) => {
            if(err) return routeErr(res, next, err)
            const name = 'action-plans-'+ Date.now() + '.csv';
            res.set(downloadAttachmentHeaders(name)).send(csv);
        })
      })
      .catch(err => routeErr(res, next, err))
  })
}

// Exported Helper Functions
// ------------------------------------------------------

function authUserForFactory(req, res, next, callback) {
  getUserFromReq(req, (err, user) => {
    if(err) return routeErr(res, next, err)
    getFactoryFromSlug(req.params.slug, (err, factory) => {
      if(err) return routeErr(res, next, err)
      // TODO: If no factory then factory no found
      if(
        user.get('access') === 'Master' ||
        user.get('factoryId') === factory.get('id')
      ) {
        callback(user, factory)
      } else { noAuth(res) }
    })
  })
}


// Exports
// ------------------------------------------------------

module.exports = {
  getSlugs: getFactoriesSlugs,
  getFactoryInfo,
  getEmployees,
  getActionPlans,
  downloadActionPlans,
  // Non route exports
  authUserForFactory,
}

// SQL Attributes
// ------------------------------------------------------

const factoryInfoFields = ['name', 'slug', 'address']
const getEmployeesFields = [
  'id', 'name', 'accessPin', 'picture', 'lastActivity'
]
const employeeWithScoreFields = [
  'lot', 'userId', 'createdAt',
]
const getActionPlansProductsFields = [
  'name',
]
const getActionPlansFields = [
  'cause', 'correction', 'completedAt', 'productId', 'createdAt',
]
const getActionPlansScoreFields = [
  'lot'
]
const downloadActionPlansFields = [
  'cause', 'correction', 'completedAt', 'createdAt',
]
const downloadActionPlansCSVFields = [
  {label: 'Lot', value: 'score.lot'},
  {label: 'Product', value: 'product.name'},
  {label: 'Score', value: 'score.totalScore'},
  {label: 'Cause', value: 'cause'},
  {label: 'Correction', value: 'correction'},
  {label: 'Created At', value: 'createdAt'},
  {label: 'Completed At', value: 'completedAt'},
]
