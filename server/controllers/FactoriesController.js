// Todo:
// * Change database helpers to promises and run them in parallel

var map = require('async/map')
var json2csv = require('json2csv')

var Factory = require('../models').Factory;
var User = require('../models').User;
var Score = require('../models').Score;
var Product = require('../models').Product;
var ActionPlan = require('../models').ActionPlan;
var sequelize = require('../models').sequelize;

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

// Non Route API Functions
// ------------------------------------------------------

function globalDashboardKPIs() {
  return Promise
    .all([
      getFactoryInfoForGlobalDashboard(),
      Score.find({attributes: scoreAverageAttributes}),
    ])
    .then((data) => {
      const avgScr = Number(data[1].get('averageScore')).toFixed(2);
      return new Promise((resolve, reject) => {
         map(
          data[0],
          (factory, next) => {
            factory = factory.get({plain:true})
            const factoryAvg = Number(factory.averageScore).toFixed(2)
            factory.averageScore = factoryAvg;
            factory.diffWithAverage = ((factoryAvg - avgScr).toFixed(2) + '%');
            next(false, factory)
          },
          (err, factories) => {
            if(err) return reject(err)
            resolve(factories)
          }
        )
      })
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

// Exported Helper Functions
// ------------------------------------------------------

function getFactoryInfoForGlobalDashboard() {
  return Factory
    .findAll({
      attributes: getFactoriesGlobalDashboard,
      include: [{
        model: Score, as: 'scores',
        attributes: [],
        include: [{
          model: ActionPlan, as: 'actionPlan',
          attributes: [],
        }]
      }],
      group: ['factory.id'],
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
  globalDashboardKPIs,
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
const getFactoriesGlobalDashboard = [
  'name', 'slug', 'country', 
  [sequelize.fn('COUNT', sequelize.col('Scores.id')), 'totalScores'],
  [sequelize.fn('AVG', sequelize.col('Scores.totalScore')), 'averageScore'],
  [sequelize.fn('COUNT', sequelize.col('scores->actionPlan.id')), 'totalActionPlans'],
  [sequelize.fn('MAX', sequelize.col('Scores.createdAt')), 'lastActivity']
]
const scoreAverageAttributes = [
 [sequelize.fn('AVG', sequelize.col('Score.totalScore')), 'averageScore']
]
