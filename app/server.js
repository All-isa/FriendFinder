//dependencies, NPM packages that gives server functionality

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

//sets up express server
var app = express();
var PORT = process.env.PORT || 3000; 


//standard Body-parser code, makes it easy for interpretation of data for server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

//route files for the server

require('./routing/apiRoutes.js')(app); 
require('./routing/htmlRoutes.js')(app);

//listener starts app

app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});