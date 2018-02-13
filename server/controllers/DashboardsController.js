const Promise = require('bluebird');

const routeErr = require('../utils/routeErr.js');

const ActionPlansCtr = require('./ActionPlansController.js');
const ScoresController = require('./ScoreController.js');

const FactoriesController = require('./FactoriesController.js');

const { authUserForFactory } = FactoriesController;


// Route Functions
// ------------------------------------------------------
function globalDashboard(req, res, next) {
  Promise.all([
    ActionPlansCtr.globalDashboardKPIs(),
    ScoresController.globalDashboardKPIs(),
    FactoriesController.globalDashboardFactoriesKPIs(),
    FactoriesController.globalDashboardMapKPIs(),
  ])
    .then(data => res.json({
      err: false,
      actionPlans: data[0],
      scores: data[1],
      factories: data[2],
      factoriesMap: data[3],
    }))
    .catch(err => routeErr(res, next, err));
}

function factorySummary(req, res, next) {
  authUserForFactory(req, res, next, (user, factory) => {
    Promise.all([
      ActionPlansCtr.factorySummaryKPIs(factory),
    ])
      .then(data => res.json({
        err: false,
        actionPlans: data[0],
      }))
      .catch(err => routeErr(res, next, err));
  });
}


module.exports = {
  global: globalDashboard,
  factorySummary,
};
