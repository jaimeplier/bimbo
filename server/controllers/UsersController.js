var uuid = require('node-uuid');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var secret = process.env.SESSION_SECRET;

var User = require('../models').User;

var FactoriesController = require('./FactoriesController.js');
var authUserForFactory = FactoriesController.authUserForFactory;

var routeErr = require('./../utils/routeErr.js');
var genErr = require('./../utils/generalError.js');
var filterDbObj = require('./../utils/filterDbObjectKeys.js');
var sendEmails = require('./../utils/sendEmails.js');
var noAuth = require('./../utils/noAuth.js');

var frontEndEnglish = require('./../i18n/frontEnd-en.js');
var frontEndSpanish = require('./../i18n/frontEnd-es.js');



// Route Functions
// ------------------------------------------------------
function createMasterUser(req, res, next) {
  if(req.body.createKey !== process.env.CREATE_SECRET) return next();
  var user = req.body;
  user.access = 'Master';
  user.resetToken = uuid.v1();
  User
    .create(user, {fields: createMasterUserFields})
    .then((user) => {
      sendEmails.welcomeRegister(user);
      res.json(user);
    })
    .catch(err => routeErr(res, next, err))
}

function createManager(req, res, next) {
  authUserForFactory(req, res, next, (reqUser, factory) => {
    var user = req.body
    user.access = 'Admin'
    user.factoryId = factory.get('id')
    user.resetToken = uuid.v1()
    User
      .create(user, {fields: createManagerFields})
      .then((user) => {
        sendEmails.welcomeRegister(user)
        res.json(user)
      })
      .catch(err => routeErr(res, next, err))
  })
}

function createEmployee(req, res, next) {
  authUserForFactory(req, res, next, (reqUser, factory) => {
    var user = req.body
    user.access = 'Employee'
    user.factoryId = factory.get('id')
    createUniqueAccessPin((err, pin) => {
      if(err) return routeErr(res, next, err);
      user.accessPin = pin;
      User
        .create(user, {fields: createEmployeeFields})
        .then((user) => {
          res.json(filterDbObj(user, createEmployeeFltrRes))
        })
        .catch(err => routeErr(res, next, err))
    })
  })
}

function registerUser(req, res, next) {
  User
    .findOne({where: {resetToken: req.body.resetToken}})
    .then(user => {
      if(!user) return genErr(res, next, 'userRegisterMissingToken');
      var password = req.body.password;
      if(!password || password.length < 5) return genErr(res, next, 'passwordTooShort');

      user
        .update({password, resetToken: null})
        .then(() => setUserSessionDataAndRespond(req, res, user))
        .catch(err => routeErr(req, next, err))
    })
    .catch(err => routeErr(res, next, err))
}

function logInUser(req, res, next) {
  User
    .findOne({where: {email: req.body.email}})
    .then((user) => {
      if(!user) return genErr(res, next, 'emailDoesNotExist');
      if(!user.get('password')) return genErr(res, next, 'registerFirst');
      return bcrypt
        .compare(req.body.password, user.get('password'))
        .then(auth => {
          if(!auth) return genErr(res, next, 'incorrectEmailOrPassword');
          setUserSessionDataAndRespond(req, res, user);
        })
    })
    .catch(err => routeErr(res, next, err))
}

function authorizeEmployee(req, res, next) {
  User
    .findOne({
      where: {accessPin: req.body.accessPin},
      attributes: authorizeEmployeeFields,
    })
    .then((user) => {
      if(!user) return genErr(res, next, 'incorrectPin');
      updateUsersLastActivityFromId(user.id);
      jwt.sign(user.get({plain:true}), secret, function(err, token) {
        if(err) return routeErr(res, next, err);
        res.json({token: token});
      })
    })
}

function getAuthenticatedUser(req, res, next) {
  res.json({user: req.session.user, err: false});
}

function getLanguage(req, res, next) {
  const lan = req.session && req.session.language;
  if(!lan) return res.json({ok:'true'});
  if(lan === 'en') return res.json(frontEndEnglish);
  if(lan === 'es') return res.json(frontEndSpanish);
}

function logout(req, res, next) {
  req.session.destroy();
  res.json({ok: true});
}

function authMasterUser(req, res, next) {
  var access = req.session && req.session.access;
  if(access === 'Master') {
    next();
    updateUsersLastActivity(req);
  } else {
    noAuth(res);
  }
}

function authAdminUser(req, res, next) {
  var access = req.session && req.session.access;
  if(access === 'Master' || access == 'Admin') {
    next();
    updateUsersLastActivity(req);
  } else {
    noAuth(res);
  }
}

function authEmployeeUser(req, res, next) {
  var auth = req.get('Authorization');
  if(!auth) return noAuth(res)
  if(auth.substr(0,7) !== 'Bearer ') noAuth(res);
  var token = auth.substr(7, auth.length);
  jwt.verify(token, secret, function(err, decoded) {
    if(err) {
      noAuth(res);
      return console.log('Error verifying jwt: ', err);
    }
    res.locals.jwtAuth = decoded;
    next();
  })
}


// Helper Functions
// ------------------------------------------------------

function updateUsersLastActivity(req) {
  var userId = req.session && req.session.userId;
  updateUsersLastActivityFromId(userId);
}

function updateUsersLastActivityFromId(userId) {
  User
    .update(
      {lastActivity: Date.now()},
      {where: {id: userId}}
    )
    .catch(err => console.log('error updating user lastActivity: ', err))
}

function setUserSessionDataAndRespond(req, res, user) {
  req.session.userId = user.id;
  user = filterDbObj(user, ['name', 'email', 'access', 'language']);
  req.session.user = user;
  req.session.access = user.access;
  req.session.language = user.language;
  res.json({err: false, user});
}


function createUniqueAccessPin(callback, callcount) {
  callcount = callcount || 0;
  if(callcount > 5) return callback(
    {msg: 'Could not find available access pin'})
  // Creates random number between 100000 and 999999
  var newPin = Math.floor(100000 + Math.random() * 900000)
  User
    .findOne({
      where: {accessPin: newPin},
      attributes: ['accessPin'],
    })
    .then((user) => {
      if(user) {
        createUniqueAccessPin(callback, ++callcount)
      } else {
        callback(null, newPin)
      }
      return null;
    })
    .catch(e => callback(e));
}

// Exports
// ------------------------------------------------------

module.exports = {
  createMasterUser: createMasterUser,
  registerUser: registerUser,
  createManager,
  createEmployee,
  authorizeEmployee: authorizeEmployee,
  logInUser: logInUser,
  getAuthenticatedUser: getAuthenticatedUser,
  getLanguage: getLanguage,
  logout: logout,
  authMasterUser: authMasterUser,
  authAdminUser: authAdminUser,
  authEmployeeUser: authEmployeeUser,
}

// SQL Attributes
// ------------------------------------------------------

const createMasterUserFields = [
  'name', 'email', 'access', 'resetToken', 'password', 'language'
];
const createManagerFields = [
  'name', 'email', 'access', 'resetToken', 'language', 'factoryId',
]
const createEmployeeFields = [
  'name', 'access', 'language', 'accessPin', 'factoryId'
]
const createEmployeeFltrRes = [
  'name', 'language', 'accessPin'
]
const authorizeEmployeeFields = [
  'id', 'name', 'access', 'factoryId', 'language'
]
