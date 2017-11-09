var map = require('async/map')

var Factory = require('../models').Factory;
var routeErr = require('../utils/routeErr.js');

// Route Functions
// ------------------------------------------------------

function getFactoriesSlugs(req, res, next) {
  Factory
    .findAll({attributes: ['slug', 'name']})
    .then(factories => res.json({err: false, factories}))
    .catch(err => routeErr(res, next, err))
}

// Exports
// ------------------------------------------------------

module.exports = {
  getSlugs: getFactoriesSlugs,
}

// SQL Attributes
// ------------------------------------------------------
