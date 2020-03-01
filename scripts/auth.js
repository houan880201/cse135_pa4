const firebaseConfig = {  
    apiKey: 'AIzaSyDGAoR5IzzLN_wP6RxmKszQx7XC-YU2xvs',  
    authDomain: 'https://cse135-pa3.firebaseapp.com',  
    projectId: 'cse135-pa3'
}

firebase.initializeApp(firebaseConfig);
const loginBtn = document.getElementById("loginBtn");
//console.log(document);
console.log(loginBtn);

/*loginBtn.addEventListener('click', e => {
  // const emailVal = email.value;
  // const pwdVal = password.value;
  //const auth = firebase.auth();
  //const promise = firebase.auth().signInWithPopup(provider).then(function(result);
  // collect credentials and send to firebase
  //const promise = auth.signInWithEmailAndPassword(emailVal, pwdVal);
  // catch and print error, if any, in console 
  //promise.catch(e => console.log(e.message));
});
*/

loginBtn.addEventListener('click', (event) => {
    var provider = new firebase.auth.GoogleAuthProvider();
    //const promise = firebase.auth().signInWithPopup(provider).then(function(result));
    //const promise = auth.createUserWithEmailAndPassword(emailVal, pwdVal);
    // catch and print error, if any, in console 

    const promise = firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        alert("loging in");
        console.log("in function");
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        console.log(errorCode);
        var errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        // ...
      });
})

