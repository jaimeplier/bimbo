var es = require('../i18n/es.json');
var en = require('../i18n/en.json');

var translations = {
  es: es,
  en: en,
}

module.exports = function(req, key) {
  var language = req.session && req.session.language || 'en';
  var t = translations[language][key];
  if(!t) console.log('Missing translation for key: ', key, ' and language: ', req.session.language);
  return t || key;
}
