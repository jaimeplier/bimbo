var mongoose = require('mongoose');
var fs = require('fs');
//connect to the database
//remember to change the database name
mongoose.connect(process.env.DB_HOST, {useMongoClient: true});

//loads all of the model files
var models_path = __dirname + '/../models'
//for each file in the path
fs.readdirSync(models_path).forEach(function(file){

  // check if file is a directory, if so load files within
	if(fs.lstatSync(models_path + '/' + file).isDirectory()) {

		fs.readdirSync(models_path+'/'+file).forEach(function(file2) {
			if(file2.indexOf('.js') > 0 && file2.indexOf('.swp') == -1) {
				require(models_path+'/'+file+'/'+file2);
			}
		})
	}
	//check if it is a js file, if so load it
	if(file.indexOf('.js') > 0 && file.indexOf('.swp') == -1){
		//load each model file
		require(models_path + '/'+ file);
	}
})
