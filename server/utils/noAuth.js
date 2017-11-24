module.exports = function noAuth(res) {
  res.status(401).send('Not authorized');
};

