var Score = require('../models').Score;
var products = require('../config/products.js');

function createScore(req, res, next) {
  console.log('the request params: ', req.params);

  res.json({ok: true});
}


module.exports = {
  create: createScore,
}

