var User = require('../models').User;
var Factory = require('../models').Factory;

function getUserFromReq(req, callback) {
  User
    .findOne({where: {email: req.session.user.email}})
    .then(user => {
      callback(false, user)
      return null;
    })
    .catch(e => callback(e))
}

function getFactoryFromSlug(slug, callback) {
  Factory
    .findOne({where: {slug:slug}})
    .then(factory => {
      callback(false, factory)
      return null;
    })
    .catch(e => callback(e))
}

module.exports = {
  getUserFromReq: getUserFromReq,
  getFactoryFromSlug: getFactoryFromSlug,
}
