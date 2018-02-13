const routeErr = require('../utils/routeErr.js');

const {
  Factory,
  Organization,
} = require('../models');

// Route Functions
// ------------------------------------------------------
function getOrganizationsAndFactories(req, res, next) {
  Organization
    .findAll({
      include: [{
        model: Factory,
        as: 'factories',
      }],
    })
    .then(result => res.json({ err: false, organizations: result }))
    .catch(err => routeErr(res, next, err));
}

function getOrganizations(req, res, next) {
  Organization
    .findAll({
      attributes: organizationInfoFields,
    })
    .then(result => res.json({ err: false, organizations: result }))
    .catch(err => routeErr(res, next, err));
}

// Non Route API Functions
// ------------------------------------------------------

module.exports = {
  getOrganizations,
  getOrganizationsAndFactories,
};

// SQL Attributes
// ------------------------------------------------------
const organizationInfoFields = ['name', 'slug'];

