const sendgrid = require('sendgrid')(process.env.SENDGRID_KEY);
const helper = require('sendgrid').mail;
const dot = require('dot');

dot.log = false;
const dots = dot.process({ path: './server/emails' });

const fromEmail = new helper.Email('info@arvolution.com');

function welcomeRegister(user) {
  const toEmail = new helper.Email(user.email);
  const subject = 'Welcome to Bimbo\'s Skyline';
  const content = new helper.Content('text/html', dots.welcomeRegister(user));
  const email = new helper.Mail(fromEmail, subject, toEmail, content);

  const request = sendgrid.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: email.toJSON(),
  });

  sendgrid.API(request, (err, res) => {
    if (err) console.log('error sending welcomeRegister email: ', err, res, content);
  });
}

module.exports = {
  welcomeRegister,
};
