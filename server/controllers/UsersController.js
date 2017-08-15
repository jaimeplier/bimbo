var Mongoose = require('mongoose');
var User = Mongoose.model('Users');
var uuid = require('node-uuid');
var routeErr = require('./../utils/routeErr.js');
var sendEmails = require('./../utils/sendEmails.js');

function createMasterUser(req, res, next) {
  if(req.body.createKey !== process.env.CREATE_SECRET) return next();
  var user = new User(req.body);
  user.access = "Master";
  user.reset_token = uuid.v1();
  user.save(function(err) {
    if(err && err.code == 11000) return routeErr(res, next, {errors: {email: "Email already exists"}});
    if(err) return routeErr(res, next, err);
    sendEmails.welcomeRegister(user);
    res.json(user);
  });
}

function registerUser(req, res, next) {
  User.findOne({reset_token: req.body.resetToken}).exec(function(err, user) {
    if(err) return routeErr(res, next, err);
    if(!user) return res.json({err: true, errors: {general: 'Incorrect token. Please check your email again'}});
    var password = req.body.password;
    if(!password || password.length < 5) return res.json({err: true, errors: {password: 'Password too short'}});

    user.password = user.generateHash(password);
    user.reset_token = '';
    user.last_activity = Date.now();

    user.save(function(err) {
      if(err) return routeErr(res, next, err);
      req.session.user = user;
      req.session.access = user.access;
      res.json({err: false, user});
    });
  })
}

function logInUser(req, res, next) {
  User.findOne({email: req.body.email}).exec(function(err, user) {
    if(err) return routeErr(res, next, err);
    if(!user) return res.json({err: true, errors: {general: 'User/email does not exist'}});
    if(!user.authenticate(req.body.password)) return res.json({err: true, errors: {general: 'Incorrect email or password'}});
    req.session.user = user;
    req.session.access = user.access;
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


module.exports = {
  createMasterUser: createMasterUser,
  registerUser: registerUser,
  logInUser: logInUser,
  getAuthenticatedUser: getAuthenticatedUser,
  logout: logout,
}
