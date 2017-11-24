const uuid = require('node-uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = process.env.SESSION_SECRET;

const { User, Factory } = require('../models');
const { Op } = require('sequelize');

const { authUserForFactory } = require('./FactoriesController.js');

const routeErr = require('./../utils/routeErr.js');
const genErr = require('./../utils/generalError.js');
const filterDbObj = require('./../utils/filterDbObjectKeys.js');
const sendEmails = require('./../utils/sendEmails.js');
const noAuth = require('./../utils/noAuth.js');

const frontEndEnglish = require('./../i18n/frontEnd-en.js');
const frontEndSpanish = require('./../i18n/frontEnd-es.js');


// Route Functions
// ------------------------------------------------------
function createMasterUser(req, res, next) {
  if (req.body.createKey !== process.env.CREATE_SECRET) return next();
  const user = req.body;
  user.access = 'Master';
  user.resetToken = uuid.v1();
  User
    .create(user, { fields: createMasterUserFields })
    .then((user) => {
      sendEmails.welcomeRegister(user);
      res.json(user);
    })
    .catch(err => routeErr(res, next, err));
}

function createManager(req, res, next) {
  authUserForFactory(req, res, next, (reqUser, factory) => {
    const user = req.body;
    user.access = 'Admin';
    user.factoryId = factory.get('id');
    user.resetToken = uuid.v1();
    User
      .create(user, { fields: createManagerFields })
      .then((user) => {
        sendEmails.welcomeRegister(user);
        res.json(user);
      })
      .catch(err => routeErr(res, next, err));
  });
}

function createEmployee(req, res, next) {
  authUserForFactory(req, res, next, (reqUser, factory) => {
    const user = req.body;
    user.access = 'Employee';
    user.factoryId = factory.get('id');
    createUniqueAccessPin((err, pin) => {
      if (err) return routeErr(res, next, err);
      user.accessPin = pin;
      User
        .create(user, { fields: createEmployeeFields })
        .then((user) => {
          res.json(filterDbObj(user, createEmployeeFltrRes));
        })
        .catch(err => routeErr(res, next, err));
    });
  });
}

function registerUser(req, res, next) {
  User
    .findOne({ where: { resetToken: req.body.resetToken } })
    .then((user) => {
      if (!user) return genErr(res, next, 'userRegisterMissingToken');
      const { password } = req.body;
      if (!password || password.length < 5) return genErr(res, next, 'passwordTooShort');

      user
        .update({ password, resetToken: null })
        .then(() => setUserSessionDataAndRespond(req, res, user))
        .catch(err => routeErr(req, next, err));
    })
    .catch(err => routeErr(res, next, err));
}

function logInUser(req, res, next) {
  User
    .findOne({
      where: {
        email: req.body.email,
        [Op.or]: [{ access: 'Master' }, { access: 'Admin' }],
      },
      include: [{
        model: Factory,
        as: 'factory',
        attributes: ['slug'],
      }],
    })
    .then((user) => {
      if (!user) return genErr(res, next, 'emailDoesNotExist');
      if (!user.get('password')) return genErr(res, next, 'registerFirst');
      return bcrypt
        .compare(req.body.password, user.get('password'))
        .then((auth) => {
          if (!auth) return genErr(res, next, 'incorrectEmailOrPassword');
          setUserSessionDataAndRespond(req, res, user);
        });
    })
    .catch(err => routeErr(res, next, err));
}

function authorizeEmployee(req, res, next) {
  User
    .findOne({
      where: { accessPin: req.body.accessPin },
      attributes: authorizeEmployeeFields,
    })
    .then((user) => {
      if (!user) return genErr(res, next, 'incorrectPin');
      updateUsersLastActivityFromId(user.id);
      jwt.sign(user.get({ plain: true }), secret, (err, token) => {
        if (err) return routeErr(res, next, err);
        res.json({ token });
      });
    });
}

function getAuthenticatedUser(req, res) {
  res.json({ user: req.session.user, err: false });
}

function getLanguage(req, res) {
  const lan = req.session && req.session.language;
  if (!lan) return res.json({ ok: 'true' });
  if (lan === 'en') return res.json(frontEndEnglish);
  if (lan === 'es') return res.json(frontEndSpanish);
}

function logout(req, res) {
  req.session.destroy();
  res.json({ ok: true });
}

function authMasterUser(req, res, next) {
  const access = req.session && req.session.access;
  if (access === 'Master') {
    next();
    updateUsersLastActivity(req);
  } else {
    noAuth(res);
  }
}

function authAdminUser(req, res, next) {
  const access = req.session && req.session.access;
  if (access === 'Master' || access === 'Admin') {
    next();
    updateUsersLastActivity(req);
  } else {
    noAuth(res);
  }
}

function authEmployeeUser(req, res, next) {
  const auth = req.get('Authorization');
  if (!auth) return noAuth(res);
  if (auth.substr(0, 7) !== 'Bearer ') noAuth(res);
  const token = auth.substr(7, auth.length);
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      noAuth(res);
      return console.log('Error verifying jwt: ', err);
    }
    res.locals.jwtAuth = decoded;
    next();
  });
}


// Helper Functions
// ------------------------------------------------------

function updateUsersLastActivity(req) {
  const userId = req.session && req.session.userId;
  updateUsersLastActivityFromId(userId);
}

function updateUsersLastActivityFromId(userId) {
  User
    .update(
      { lastActivity: Date.now() },
      { where: { id: userId } },
    )
    .catch(err => console.log('error updating user lastActivity: ', err));
}

function setUserSessionDataAndRespond(req, res, user) {
  req.session.userId = user.id;
  req.session.access = user.access;
  req.session.language = user.language;
  const plainUser = user.get({ plain: true });
  const filteredUser = filterDbObj(user, ['name', 'email', 'access', 'language']);
  filteredUser.factorySlug = plainUser.factory && plainUser.factory.slug;
  req.session.user = filteredUser;
  res.json({ err: false, user: filteredUser });
}


function createUniqueAccessPin(callback, callcount = 0) {
  if (callcount > 5) {
    return callback({ msg: 'Could not find available access pin' });
  }
  // Creates random number between 100000 and 999999
  const newPin = Math.floor(100000 + (Math.random() * 900000));
  User
    .findOne({
      where: { accessPin: newPin },
      attributes: ['accessPin'],
    })
    .then((user) => {
      if (user) {
        createUniqueAccessPin(callback, (callcount + 1));
      } else {
        callback(null, newPin);
      }
      return null;
    })
    .catch(e => callback(e));
}

// Exports
// ------------------------------------------------------

module.exports = {
  createMasterUser,
  registerUser,
  createManager,
  createEmployee,
  authorizeEmployee,
  logInUser,
  getAuthenticatedUser,
  getLanguage,
  logout,
  authMasterUser,
  authAdminUser,
  authEmployeeUser,
};

// SQL Attributes
// ------------------------------------------------------

const createMasterUserFields = [
  'name', 'email', 'access', 'resetToken', 'password', 'language',
];
const createManagerFields = [
  'name', 'email', 'access', 'resetToken', 'language', 'factoryId',
];
const createEmployeeFields = [
  'name', 'access', 'language', 'accessPin', 'factoryId',
];
const createEmployeeFltrRes = [
  'name', 'language', 'accessPin',
];
const authorizeEmployeeFields = [
  'id', 'name', 'access', 'factoryId', 'language',
];
