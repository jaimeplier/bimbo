module.exports = function(res, err) {
  res.status(err.status || 500).json({
    err: err && process.env.NODE_ENV == "development" ? err : true,
    message: err && err.message ? err.message : "Ooops, server error. Our team has been notified and will look into this."
  });
}
