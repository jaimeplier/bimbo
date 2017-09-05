var ActionPlan = require('../models').ActionPlan;
var routeErr = require('../utils/routeErr.js');

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


module.exports = {
  createOrReturnScore: createOrReturnScore,
}
