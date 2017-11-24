const { User, Factory } = require('../models');

function getUserFromReq(req, callback) {
  User
    .findOne({ where: { email: req.session.user.email } })
    .then((user) => {
      callback(false, user);
      return null;
    })
    .catch(e => callback(e));
}

function getFactoryFromSlug(slug, callback) {
  Factory
    .findOne({ where: { slug } })
    .then((factory) => {
      callback(false, factory);
      return null;
    })
    .catch(e => callback(e));
}

module.exports = {
  getUserFromReq,
  getFactoryFromSlug,
};
