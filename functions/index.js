const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

admin.initializeApp(functions.config().firebase);

//test helloworld function
exports.helloWorld = functions.https.onRequest((req, res) => {
	
	res.status(200).send('Hello World!');

});

//cloud function for showing db
exports.showdb = functions.https.onRequest((req, res) => {
	
	cors(req, res, () => {

		var db = admin.firestore();

		var json = JSON.parse(req.body);

		console.log(json);

		db.collection("sessions")
			.doc(json["sessionID"])
			.get()
			.then(function(docRef) {
				console.log(docRef.id)
				console.log(docRef.data)
				return res.status(200).send({
					cookie: docRef.id,
					data: docRef.data()
				})
			})
			.catch(error => {
				console.log(error)
				return -1
			});
	})
});

//post session which collects all the data: our /collect endpoint
exports.postSession = functions.https.onRequest((req, res) => {
	
	cors(req, res, () => {


		var db = admin.firestore();

		console.log("Post Session Starting");
		console.log(res)
		var json = JSON.parse(req.body)

		//if session already exists: updating
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
			//updates with the dynamic data
			db.collection("sessions")
				.doc(json['sessionID']).update({
					click: json['click'],
					mouseover: json['mouseover'],
					keydown: json['keydown'],
					scroll: json['scroll'],
					beforeUnload: json['beforeUnload']
				});
		} 
		//if it doesnt exist then add the static data and performance data first 
		else{
			db.collection("sessions").add({
				userAgent: json['userAgent'],
				language: json['language'],
				performanceData: json['performanceData'],
				staticData: json['staticData']
			})
			//returns the cookie
			.then(function(docRef) {
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