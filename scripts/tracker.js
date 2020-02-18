console.log("Connected to Tracker.js")


var xhr = new XMLHttpRequest();

function start() {
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:5001/cse135-pa3/us-central1/postSession";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json.email + ", " + json.password);
        }
    };
    var data = {
        "user-agent": navigator.userAgent, 
        "language": navigator.language
    };
    xhr.send(data);
    console.log(res)
}