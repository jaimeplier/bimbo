var FactoriesController = require ("./../controllers/FactoriesController.js");
module.exports = function(app) {

  app.get('/api/test', function(req, res) {
    res.json({
      ok: true
    })
  })

  app.post('/api/factories', FactoriesController.saveFactory)
}
