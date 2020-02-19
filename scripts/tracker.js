console.log("Connected to Tracker.js")


var xhr = new XMLHttpRequest();

function start() {

    var data = JSON.stringify({
        userAgent: navigator.userAgent, 
        language: navigator.language,
        sessionID: document.cookie.split("=")[1]
    });

    var url = "https://us-central1-cse135-pa3.cloudfunctions.net/postSession";

    xhr.onreadystatechange = function () {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          console.log(xhr.responseText);
          document.cookie = "sessionID=" + xhr.responseText
        }
    };

    xhr.open('POST', url, true);
    xhr.send(data);

    console.log(xhr.response)
}