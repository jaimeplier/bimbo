var Promise = require('bluebird');


var Score = require('../models').Score;
var Product = require('../models').Product;
var products = require('../config/products.js');
var genErr = require('../utils/generalError.js');
var routeErr = require('../utils/routeErr.js');
var ActionPlansCtr = require('./ActionPlansController.js');

// Route Functions
// ------------------------------------------------------

function createScore(req, res, next) {
  var product = products[req.params.product];
  var auth = res.locals.jwtAuth;
  if(!product) return genErr(res, next, 'productDoesNotExist');

  product = product.concat(['lot', 'factoryId', 'productId', 'userId']);

  var data = req.body.score;
  data.factoryId = auth.factoryId;
  data.productId = 1;
  data.userId = auth.id;

  Score
    .create(data, { fields: product })
    .then(scr => ActionPlansCtr.createOrReturnScore(req, res, next, scr))
    .catch(err => routeErr(res, next, err))
}


// Non Route API Functions
// ------------------------------------------------------

function globalDashboardKPIs() {
  return Promise
    .all([
      Score.count({where: {'totalScore': {$gt: 79}}}),
      Score.count({where: {'totalScore': {$lt: 79}}}),
    ])
    .then(data => { return {
      successful: data[0],
      unsuccessful: data[1],
    }})
}

function factorySummaryKPIs(factory) {
  return Promise
    .all([
      getLatestScores(factory.get('id')),
    ])
    .then(data => { return {
      latestScores: data[0],
    }})
}


// ---------------- Helper Functions

function getLatestScores(factoryId) {
  return Score
    .findAll({
      where: {factoryId}
    })
}

function determineLotTotalScore() {

}


module.exports = {
  create: createScore,
  factorySummaryKPIs,
  globalDashboardKPIs,
}
