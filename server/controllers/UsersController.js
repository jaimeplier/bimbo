var User = require('../models').User;
var uuid = require('node-uuid');
var routeErr = require('./../utils/routeErr.js');
var sendEmails = require('./../utils/sendEmails.js');

function createMasterUser(req, res, next) {
  if(req.body.createKey !== process.env.CREATE_SECRET) return next();
  var user = req.body;
  user.access = 'Master';
  user.resetToken = uuid.v1();
  User
    .create(user, {
      fields: ['name', 'email', 'access', 'resetToken', 'password', 'language'],
    })
    .then((user) => {
      sendEmails.welcomeRegister(user);
      res.json(user);
    })
    .catch(err => routeErr(res, next, err))
}

function registerUser(req, res, next) {
  User
    .findOne({where: {resetToken: req.body.resetToken}})
    .then(user => {
      if(!user) return routeErr(res, next, {name: 'General', message: 'userRegisterMissingToken'});
      console.log('the user: ', user);
      res.json({ok: true});
    })
    .catch(err => routeErr(res, next, err))

  //User.findOne({reset_token: req.body.resetToken}).exec(function(err, user) {
  //  if(err) return routeErr(res, next, err);
  //  if(!user) return res.json({err: true, errors: {general: 'Incorrect token. Please check your email again'}});
  //  var password = req.body.password;
  //  if(!password || password.length < 5) return res.json({err: true, errors: {password: 'Password too short'}});

  //  user.password = user.generateHash(password);
  //  user.reset_token = '';
  //  user.last_activity = Date.now();

  //  user.save(function(err) {
  //    if(err) return routeErr(res, next, err);
  //    req.session.user = user;
  //    req.session.access = user.access;
  //    res.json({err: false, user});
  //  });
  //})
}

function logInUser(req, res, next) {
  User.findOne({email: req.body.email}).exec(function(err, user) {
    if(err) return routeErr(res, next, err);
    if(!user) return res.json({err: true, errors: {general: 'User/email does not exist'}});
    if(!user.authenticate(req.body.password)) return res.json({err: true, errors: {general: 'Incorrect email or password'}});
    req.session.access = user.access;
    req.session.userId = user.id;
    req.session.user = user;
    res.json({err: false, user: user});
  });
}

function getAuthenticatedUser(req, res, next) {
  res.json({user: req.session.user, err: false});
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
    res.status(401).send('Not authorized');
  }
}


//-------- Helper Functions

function updateUsersLastActivity(req) {
  var userId = req.session && req.session.userId;
  User.findOne({_id: userId}).exec(function(err, user) {
    if(err) return routeErr(null, null, err);
    user.last_activity = Date.now();
    user.save(function(err) { if(err) routeErr(null, null, err) });
  });
}

// ------- Exports
module.exports = {
  createMasterUser: createMasterUser,
  registerUser: registerUser,
  logInUser: logInUser,
  getAuthenticatedUser: getAuthenticatedUser,
  logout: logout,
  authMasterUser: authMasterUser,
}
