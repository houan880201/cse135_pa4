const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});


admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((req, res) => {
	
	res.status(200).send('Hello World!');

});


exports.postSession = functions.https.onRequest((req, res) => {
	
	cors(req, res, () => {

		var db = admin.firestore();

		console.log("aosidjasoidjaod");
		var json = JSON.parse(req.body)

		if (json['sessionID']) {

			db.collection("sessions")
				.doc(json['sessionID'])
				.get()
				.then(function(docRef) {
					res.status(200).send(docRef.id)
					res.body['id'] = docRef.id
					return res
				})
				.catch(function(error) {
					res.status(200).send("Failed to Post ")
				})

			db.collection("sessions")
				.doc(json['sessionID']).update({
					hi: "hehe"
				});
		} 
		else{
			db.collection("sessions").add({
				userAgent: json['userAgent'],
				language: json['language']
			})
			.then(function(docRef) {
				res.status(200).send(docRef.id)
				console.log("COOKIE : " + docRef.id)
				res.body['id'] = docRef.id
				return res
			})
			.catch(function(error) {
				res.status(200).send("Failed to Post ")
				return error
			})
		}

		return res
	});

});