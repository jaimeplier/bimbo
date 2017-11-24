const Promise = require('bluebird');


const { Score } = require('../models');
const products = require('../config/products.js');
const genErr = require('../utils/generalError.js');
const routeErr = require('../utils/routeErr.js');
const ActionPlansCtr = require('./ActionPlansController.js');

// Route Functions
// ------------------------------------------------------

function createScore(req, res, next) {
  let product = products[req.params.product];
  const auth = res.locals.jwtAuth;
  if (!product) return genErr(res, next, 'productDoesNotExist');

  product = product.concat(['lot', 'factoryId', 'productId', 'userId']);

  const data = req.body.score;
  data.factoryId = auth.factoryId;
  data.productId = 1;
  data.userId = auth.id;

  Score
    .create(data, { fields: product })
    .then(scr => ActionPlansCtr.createOrReturnScore(req, res, next, scr))
    .catch(err => routeErr(res, next, err));
}


// Non Route API Functions
// ------------------------------------------------------

function globalDashboardKPIs() {
  return Promise
    .all([
      Score.count({ where: { totalScore: { $gt: 79 } } }),
      Score.count({ where: { totalScore: { $lt: 79 } } }),
    ])
    .then(data => ({
      successful: data[0],
      unsuccessful: data[1],
    }));
}

function factorySummaryKPIs(factory) {
  return Promise
    .all([
      getLatestScores(factory.get('id')),
    ])
    .then(data => ({
      latestScores: data[0],
    }));
}


// ---------------- Helper Functions

function getLatestScores(factoryId) {
  return Score
    .findAll({
      where: { factoryId },
    });
}

// eslint-disable-next-line
function determineLotTotalScore() {

}


module.exports = {
  create: createScore,
  factorySummaryKPIs,
  globalDashboardKPIs,
};
