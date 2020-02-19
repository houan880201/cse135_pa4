console.log("Connected to Tracker.js")

var xhr = new XMLHttpRequest();

function start() {

    var data = JSON.stringify({
        userAgent: navigator.userAgent, 
        language: navigator.language, 
        hi: "hehe",
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


function test() {

    var data = JSON.stringify({
        userAgent: navigator.userAgent, 
        language: navigator.language, 
        hi: "hehe",
        sessionID: document.cookie.split("=")[1]
    });

    var url = "https://us-central1-cse135-pa3.cloudfunctions.net/postSession";
    xhr.open('POST', url, true);
    xhr.send(data);
}

// window.onload = function(){

//     setTimeout(function(){       
//         var t = window.performance.timing;
//         var startTime = t.responseEnd;
//         var endTime = t.loadEventEnd;
//         var loadTime = endTime - startTime;

//         var performance_data = {
//             "start": startTime,
//             "stop": endTime,
//             "loadTime": loadTime,
//             "pt": t
//         }

//         var url = document.URL;
//         var idx = url.lastIndexOf("/") + 1
//         var idx2 = url.lastIndexOf(".")
//         var name = url.slice(idx, idx2)

//         localStorage.setItem(name + '_performance_data', JSON.stringify(performance_data));
//         console.log(performance_data)
//     }, 0);
//   }

