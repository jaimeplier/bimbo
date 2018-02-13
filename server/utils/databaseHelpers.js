const {
  User,
  Factory,
  Organization,
  Product,
} = require('../models');

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

function getOrganizationFromSlug(slug, callback) {
  Organization
    .findOne({ where: { slug } })
    .then((organization) => {
      callback(false, organization);
      return null;
    })
    .catch(e => callback(e));
}

function getProductFromSlug(slug, callback) {
  Product
    .findOne({ where: { slug } })
    .then((product) => {
      callback(false, product);
      return null;
    })
    .catch(e => callback(e));
}

function getDateTimesFromSlug(slug) {
  const initialTime = Date.now();
  let endTime;
  switch (slug) {
    case 'last-24':
      endTime = new Date(initialTime.getTime() - (24 * 60 * 60 * 1000));
      break;
    case 'last-week':
      endTime = new Date(initialTime.getTime() - (7 * 24 * 60 * 60 * 1000));
      break;
    case 'last-month':
      endTime = new Date(initialTime.getTime() - (30 * 24 * 60 * 60 * 1000));
      break;
    case 'last-year':
      endTime = new Date(initialTime.getTime() - (365 * 24 * 60 * 60 * 1000));
      break;
    default:
      break;
  }
  const dates = { initialTime, endTime };
  return (dates);
}

module.exports = {
  getUserFromReq,
  getFactoryFromSlug,
  getOrganizationFromSlug,
  getDateTimesFromSlug,
  getProductFromSlug,
};
