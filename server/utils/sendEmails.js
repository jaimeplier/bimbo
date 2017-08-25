var sendgrid = require('sendgrid')(process.env.SENDGRID_KEY);
var helper = require('sendgrid').mail;
var dot = require('dot')
dot.log = false;
var dots = dot.process({path: './server/emails'});

var fromEmail = new helper.Email('info@arvolution.com');

function welcomeRegister(user) {
  var toEmail = new helper.Email(user.email);
  var subject = 'Welcome to Bimbo\'s Skyline';
  var content = new helper.Content('text/html', dots.welcomeRegister(user));
  var email = new helper.Mail(fromEmail, subject, toEmail, content);

  var request = sendgrid.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: email.toJSON(),
  });

  sendgrid.API(request, function(err, res) {
    if(err) console.log('error sending welcomeRegister email: ', err, res, content);
  });
}

module.exports = {
  welcomeRegister: welcomeRegister
}
