var Score = require('../models').Score;
var products = require('../config/products.js');
var genErr = require('../utils/generalError.js');
var routeErr = require('../utils/routeErr.js');
var ActionPlansCtr = require('./ActionPlansController.js');

function createScore(req, res, next) {
  var product = products[req.params.product];
  if(!product) return genErr(res, next, 'productDoesNotExist');

  product = product.concat(['lot', 'factoryId', 'productId', 'userId']);

  var data = req.body.score;
  data.factoryId = 1;
  data.productId = 1;
  data.userId = 1;

  Score
    .create(data, { fields: product })
    .then(scr => ActionPlansCtr.createOrReturnScore(req, res, next, scr))
    .catch(err => routeErr(res, next, err))
}

function getScores(req, res, next) {
  Score
    .findAll()
    .then(scrs => res.json({err: false, scores: scrs}))
    .catch(err => routeErr(res, next, err))
}

// ---------------- Helper Functions

function determineLotTotalScore() {
  
}


module.exports = {
  create: createScore,
  get: getScores,
}

