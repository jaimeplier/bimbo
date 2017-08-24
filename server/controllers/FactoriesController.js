//var Mongoose = require("mongoose")
//var Factory = Mongoose.model("Factories")

function saveFactory(req, res, next) {
  var factory = new Factory(req.body);
  factory.save(function(err){
    if (err) return res.json({err:err})
    res.json(factory);
  })

}

module.exports = {
  saveFactory: saveFactory
}
