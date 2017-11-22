// Todo:
// * Change database helpers to promises and run them in parallel

var map = require('async/map')
var json2csv = require('json2csv')
var js2xmlparser = require('js2xmlparser');


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

function downloadScores(req, res, next) {
  Score
    .findAll({
      include: [{
        model: Product, attributes: ['name'],
      }]
    })
    .then((scrs) => {
      const fileType = req.params.fileType;
      switch(fileType) {
        case 'csv':
          return sendCSVFile(scrs, 
            downloadScoresCSVFields,
            downloadScoresCSVFieldNames,
            res, next
          )
        case 'xml':
          return sendXMLFile(scrs,
            'scores', 'scores', res
          )
        default:
          console.log('Err: Downloading scores fileType not found')
          return res.json({err: true, message: 'Download type not found'})
      }
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
        const fileType = req.params.fileType;
        switch(fileType) {
          case 'csv':
            return sendCSVFile(ap,
              downloadActionPlansCSVFields,
              null, res, next
            )
          case 'xml':
            return sendXMLFile(ap,
              'action-plans', 'ActionPlans', res
            )
          default:
            console.log('Err: Downloading action plans fileType not found')
            return res.json({err: true, message: 'Download type not found'})
        }
      })
      .catch(err => routeErr(res, next, err))
  })
}

// Non Route API Functions
// ------------------------------------------------------

function globalDashboardFactoriesKPIs() {
  return Promise
    .all([
      getFactoryInfoForGlobalDashboard(),
      Score.find({attributes: scoreAverageAttributes}),
    ])
    .then((data) => {
      const avgScr = Number(data[1].get('averageScore')).toFixed(2);
      return new Promise((resolve, reject) => {
         map(data[0],
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

function globalDashboardMapKPIs() {
  return Factory
    .findAll({
      attributes: getFactoriesMapGlobalDashboard,
      include: [{
        model: Score, as: 'scores',
        attributes: [],
      }],
      group: ['Factory.country'],
      raw: true,
    })
    .then(data => {
      return new Promise((resolve, reject) => {
        map(data,
          (c, next) => next(false, [
            c.country, c.totalScores
          ]),
          (err, countries) => {
            if(err) return reject(err)
            countries.unshift(['Country', 'Scores'])
            resolve(countries)
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

// Helper Functions
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
      group: ['Factory.id'],
    })
}

function sendCSVFile(data, fields, fieldNames, res, next) {
  console.log('the fileds: ', fields.length)
  console.log('the filedsNames: ', fieldNames.length)
  json2csv({data, fields, fieldNames}, (err, csv) => {
    if(err) return routeErr(res, next, err)
    const name = 'action-plans-'+ Date.now() +'.csv'
    res.set(downloadAttachmentHeaders(name)).send(csv)
  })
}

function sendXMLFile(data, fName, tag, res) {
  data = data.map(r => r.toJSON())
  const name = fName+ Date.now() +'.xml'
  const xml = js2xmlparser.parse(tag, data)
  res.set(downloadAttachmentHeaders(name)).send(xml)
}

// Exports
// ------------------------------------------------------

module.exports = {
  getSlugs: getFactoriesSlugs,
  getFactoryInfo,
  getEmployees,
  getActionPlans,
  downloadScores,
  downloadActionPlans,
  globalDashboardFactoriesKPIs,
  globalDashboardMapKPIs,
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
  [sequelize.fn('COUNT', sequelize.col('scores.id')), 'totalScores'],
  [sequelize.fn('AVG', sequelize.col('scores.totalScore')), 'averageScore'],
  [sequelize.fn('COUNT', sequelize.col('scores->actionPlan.id')), 'totalActionPlans'],
  [sequelize.fn('MAX', sequelize.col('scores.createdAt')), 'lastActivity']
]
const scoreAverageAttributes = [
 [sequelize.fn('AVG', sequelize.col('Score.totalScore')), 'averageScore']
]
const getFactoriesMapGlobalDashboard = [
  'country',
  [sequelize.fn('COUNT', sequelize.col('scores.id')), 'totalScores'],
]
const downloadScoresCSVFields = [
  'Product.name', 'lot', 'label', 'airTightness', 'packaging',
  'size', 'cleanliness', 'promotions', 'product', 'color', 'scent',
  'taste', 'edibility', 'harmlessness', 'weight', 'symmetry',
  'slicing', 'crust', 'crumbSize', 'crumbColor', 'crumbConsistency',
  'note', 'createdAt',
]
const downloadScoresCSVFieldNames = [
  'productName', 'lot', 'label', 'airTightness', 'packaging',
  'size', 'cleanliness', 'promotions', 'product', 'color', 'scent',
  'taste', 'edibility', 'harmlessness', 'weight', 'symmetry',
  'slicing', 'crust', 'crumbSize', 'crumbColor', 'crumbConsistency',
  'note', 'time',
]
