const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});


admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((req, res) => {
	
	res.status(200).send('Hello World!');

});

exports.showdb = functions.https.onRequest((req, res) => {
	
	res.status(200).send('show db!');

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

			console.log("about to update")
			console.log(json);
			db.collection("sessions")
				.doc(json['sessionID']).update({
					click: json['click'],
					mouseover: json['mouseover'],
					keydown: json['keydown'],
					scroll: json['scroll'],
					beforeUnload: json['beforeUnload']
				});
		} 
		else{
			db.collection("sessions").add({
				userAgent: json['userAgent'],
				language: json['language'],
				performanceData: json['performanceData'],
				staticData: json['staticData']
			})
			.then(function(docRef) {
				console.log("alright fucker");
				console.log(json)
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