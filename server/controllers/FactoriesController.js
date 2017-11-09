var map = require('async/map')

var Factory = require('../models').Factory;
var routeErr = require('../utils/routeErr.js');

// Route Functions
// ------------------------------------------------------

function getFactoriesSlugs(req, res, next) {
  Factory
    .findAll({attributes: ['slug']})
    .then(factories => {
      map(
        factories,
        (factory, next) => next(false, factory.get('slug')),
        (err, factories) => res.json({err:err, factories})
      )
    })
    .catch(err => routeErr(res, next, err))
}

// Exports
// ------------------------------------------------------

module.exports = {
  getSlugs: getFactoriesSlugs,
}

// SQL Attributes
// ------------------------------------------------------
