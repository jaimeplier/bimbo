var mongoose = require('mongoose');
var fs = require('fs');
//connect to the database
//remember to change the database name
mongoose.connect(process.env.DB_HOST);

//loads all of the model files
var models_path = __dirname + '/../models'
//for each file in the path
fs.readdirSync(models_path).forEach(function(file){

	if(fs.lstatSync(models_path + '/' + file).isDirectory()) {
		fs.readdirSync(models_path+'/'+file).forEach(function(file2) {
			if(file2.indexOf('.js') > 0) {
				require(models_path+'/'+file+'/'+file2);
			}
		})
	}
	//check if it is a js file, if so load it
	if(file.indexOf('.js')> 0){
		//load each model file
		require(models_path + '/'+ file);
	}
})
