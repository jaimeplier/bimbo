var Promise = require('bluebird');

var routeErr = require('../utils/routeErr.js');

var ActionPlansCtr = require('./ActionPlansController.js');

var FactoriesController = require('./FactoriesController.js');
var authUserForFactory = FactoriesController.authUserForFactory;


// Route Functions
// ------------------------------------------------------
function globalDashboard(req, res, next) {
  Promise.all([
    ActionPlansCtr.globalDashboardKPIs(),
  ])
  .then(data => res.json({
    err: false,
    actionPlans: data[0],
  }))
  .catch(err => routeErr(res, next, err))
}

function factorySummary(req, res, next) {
  authUserForFactory(req, res, next, (user, factory) => {
    Promise.all([
      ActionPlansCtr.factorySummaryKPIs(factory)
    ])
    .then(data => res.json({
      err: false,
      actionPlans: data[0],
    }))
    .catch(err => routeErr(res, next, err))
  })
}


module.exports = {
  global: globalDashboard,
  factorySummary: factorySummary,
}
