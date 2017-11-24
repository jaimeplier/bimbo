const es = require('../i18n/es.json');
const en = require('../i18n/en.json');

const translations = {
  es,
  en,
};

module.exports = function getTranslation(req, key) {
  const language = (req.session && req.session.language) || 'en';
  const t = translations[language][key];

  if (!t) console.log(`Missing translation for key: ${key} and language: ${req.session.language}`);
  return t || key;
};
