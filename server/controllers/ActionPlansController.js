const Promise = require('bluebird');

const routeErr = require('../utils/routeErr.js');

const { ActionPlan } = require('../models');

// Route Functions
// ------------------------------------------------------
function createOrReturnScore(req, res, next, scr) {
  if (!req.body.actionPlan) return res.json({ err: false, score: scr });

  const { actionPlan } = req.body;
  actionPlan.scoreId = scr.id;
  actionPlan.createdBy = scr.userId;
  actionPlan.productId = scr.productId;
  actionPlan.factoryId = scr.factoryId;

  ActionPlan
    .create(actionPlan, {
      fields: [
        'scoreId', 'createdBy', 'productId', 'factoryId', 'cause', 'correction',
      ],
    })
    .then(ap => res.json({ err: false, score: scr, actionPlan: ap }))
    .catch(err => routeErr(res, next, err));
}

function getActionPlans(req, res, next) {
  ActionPlan
    .findAll({ include: ['score'] })
    .then(ap => res.json({ err: false, actionPlans: ap }))
    .catch(err => routeErr(res, next, err));
}

function markAsComplete(req, res, next) {
  ActionPlan
    .findOne({ where: { id: req.body.id } })
    .then((ap) => {
      ap
        .update({ completedAt: new Date(), completedBy: 1 })
        .then(() => res.json({ err: false }))
        .catch(err => routeErr(res, next, err));
    })
    .catch(err => routeErr(res, next, err));
}

// Non Route API Functions
// ------------------------------------------------------
function globalDashboardKPIs() {
  return Promise
    .all([
      getActionsPlansMetrics(),
    ])
    .then(data => ({
      metrics: data[0],
    }));
}

function factorySummaryKPIs(factory) {
  return Promise
    .all([
      getActionsPlansMetrics(factory.get('id')),
    ])
    .then(data => ({
      metrics: data[0],
    }));
}

// Helper Functions
// ------------------------------------------------------
function getActionsPlansMetrics(factoryId) {
  const timeScope = {
    $lt: new Date(),
    // 1 month (days, hours, minutes, seconds, miliseconds)
    $gt: new Date(new Date() - (30 * 24 * 60 * 60 * 1000)),
  };

  const whereCompleted = {
    completedAt: { $eq: null },
    createdAt: timeScope,
  };
  const whereNotCompleted = {
    completedAt: { $not: null },
    createdAt: timeScope,
  };

  if (factoryId) {
    whereCompleted.factoryId = factoryId;
    whereNotCompleted.factoryId = factoryId;
  }

  return Promise
    .all([
      ActionPlan.count({ where: whereCompleted }),
      ActionPlan.count({ where: whereNotCompleted }),
    ])
    .then(data => ({
      pending: data[0],
      completed: data[1],
      created: data[0] + data[1],
    }));
}


module.exports = {
  createOrReturnScore,
  get: getActionPlans,
  complete: markAsComplete,
  globalDashboardKPIs,
  factorySummaryKPIs,
};
