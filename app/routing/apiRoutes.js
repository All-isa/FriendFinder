
// LOAD DATA
// This data source holds the of information on all possible friends
var friends = require('../data/friends.js');

// ROUTES
module.exports = function(app){

	// API GET Requests
	// Below code handles when users "visit" a page. 
	app.get('/api/friends', function(req, res){
		res.json(friends);
	});


	// API POST Requests
	// Below code handles when a user submits a form and thus submits data to the server.
	app.post('/api/friends', function(req, res){

		var bestMatch = {
			name: "",
			photo: "",
			friendDifference: 1000
		};

		var userData 	= req.body;
		var userName 	= userData.name;
		var userPhoto 	= userData.photo;
        var userScores 	= userData.scores;
        var totalDifference = 0;
        
		// Here we loop through all the friend possibilities in the database. 
		for  (var i=0; i< friends.length; i++) {
			console.log(friends[i].name);
			totalDifference = 0;
			for (var j=0; j< friends[i].scores[j]; j++){
				totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
				if (totalDifference <= bestMatch.friendDifference){
					bestMatch.name = friends[i].name;
					bestMatch.photo = friends[i].photo;
					bestMatch.friendDifference = totalDifference;
				}
			}
		}

		// Finally save the user's data to the database (this has to happen AFTER the check.
		friends.push(userData);

		// Return a JSON with the user's bestMatch
		res.json(bestMatch);
	});
}