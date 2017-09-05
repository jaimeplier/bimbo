var ActionPlan = require('../models').ActionPlan;
var routeErr = require('../utils/routeErr.js');
var sequelize = require('sequelize');
var Promise = require('bluebird');

function createOrReturnScore(req, res, next, scr) {
  if(!req.body.actionPlan) return res.json({err: false, score: scr});

  var actionPlan = req.body.actionPlan;
  actionPlan.scoreId = scr.id;
  actionPlan.createdBy = scr.userId;
  actionPlan.productId = scr.productId;
  actionPlan.factoryId = scr.factoryId;
  
  ActionPlan
    .create(actionPlan, { fields: [
        'scoreId', 'createdBy', 'productId', 'factoryId', 'cause', 'correction'
    ]})
    .then(ap => res.json({err: false, score: scr, actionPlan: ap}))
    .catch(err => routeErr(res, next, err))
}

function getActionPlansKPIs(req, res, next) {
  var timeScope = {
    $lt: new Date(),
    $gt: new Date(new Date() - 30*24*60*60*1000) // 1 month (days, hours, minutes, seconds, miliseconds)
  }

  Promise
    .all([
      ActionPlan.count({where: {
        'completedAt': {$eq: null},
        'createdAt': timeScope,
      }}),
      ActionPlan.count({where: {
        'completedAt': {$not: null},
        'createdAt': timeScope,
      }})
    ])
    .then(data => res.json({
      err: false,
      pending: data[0],
      completed: data[1],
      created: data[0] + data[1],
    }))
    .catch(err => routeErr(res, next, err))
}

function getActionPlans(req, res, next) {
  ActionPlan
    .findAll({include: ['score']})
    .then(ap => res.json({err: false, actionPlans: ap}))
    .catch(err => routeErr(res, next, err))
}


module.exports = {
  createOrReturnScore: createOrReturnScore,
  getKPIs: getActionPlansKPIs,
  get: getActionPlans,
}
