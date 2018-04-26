
// LOAD DATA
// This data source holds the of information on all possible friends

var friends = require('../data/friends.js');

// ROUTES

module.exports = function(app){

	// API GET Requests
	// Below code handles when users "visit" a page. 
	// In each of the below cases when a user visits a link 
	// (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table) 

	app.get('/api/friends', function(req, res){
		res.json(friends);
	});


	// API POST Requests
	// Below code handles when a user submits a form and thus submits data to the server.
	// In each of the below cases, when a user submits form data (a JSON object)
	// ...the JSON is pushed to the appropriate Javascript array
	// ---------------------------------------------------------------------------

	app.post('/api/friends', function(req, res){

		// Note the code here. Our "server" will respond to a user's survey result
		// Then compare those results against every user in the database.
		// It will then calculate the difference between each of the numbers and the user's numbers.
		// It will then choose the user with the least differences as the "best friend match."
		// In the case of multiple users with the same result it will choose the first match.
		// After the test, it will push the user to the database. 

		// We will use this object to hold the "best match". We will constantly update it as we 
		// loop through all of the options 
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

		// Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
		// the database will always return that the user is the user's best friend).
		friends.push(userData);

		// Return a JSON with the user's bestMatch. This will be used by the HTML in the next page. 
		res.json(bestMatch);
	});
}