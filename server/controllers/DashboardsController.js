var Promise = require('bluebird');

var routeErr = require('../utils/routeErr.js');

var ActionPlansCtr = require('./ActionPlansController.js');


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


module.exports = {
  global: globalDashboard,
}
