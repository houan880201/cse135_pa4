const functions = require('firebase-functions');
const admin = require('firebase-admin');


 
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((req, res) => {
	
	res.status(200).send('Hello World!');

});


exports.postSession = functions.https.onRequest((req, res) => {
	
	var db = admin.firestore();

	console.log("aosidjasoidjaod");
	console.log(req.body)
	console.log(JSON.parse(req.body))

	// db.collection("sessions").add({
	// 	"user-agent": req.body['user-agent'],
	// 	"language": req.body['language']
	// })
	// .then(function(docRef) {
	// 	res.status(200).send("Successfully Posted" + docRef.id)
	// 	return docRef.id
	// })
	// .catch(function(error) {
	// 	res.status(200).send("Failed to Post " + docRef.id)
	// 	return error
	// })


	return res

});