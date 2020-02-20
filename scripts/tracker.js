console.log("Connected to Trsadasdadadsadaddsadasdsadadacker.js")

var xhr = new XMLHttpRequest();

let cookies_on = navigator.cookieEnabled;
// js check
let js_check;
document.writeln("<img id='js-check'/>"); 
if(document.getElementById('js-check') == null){
    js_check = false;
} else {
    js_check = true;
}

// image check
let image_check;
if (document.getElementById('dummy') != null){
    image_check = true;
} else {
    image_check = false;
}

// css check
let css_check;
let dummy_img = document.getElementById('dummy')
let style = window.getComputedStyle(dummy_img)
let width = style.getPropertyValue('width')
if (width == "0px"){
    css_check = true;
} else {
    css_check = false;
}

// available height / width
let available_height = window.screen.height * window.devicePixelRatio;
let available_width = window.screen.width * window.devicePixelRatio;

// window height / width
let window_height = window.innerHeight;
let window_width = window.innerWidth;

// connection type
let connection_type = navigator.connection.effectiveType;


let static_data = {
    "cookies": cookies_on,
    "js": js_check,
    "img": image_check,
    "css": css_check,
    "avail_h": available_height,
    "avail_w": available_width,
    "win_h": window_height,
    "win_w": window_width,
    "connection": connection_type    
}

console.log("i will fucking shoot myself");
var t = window.performance.timing;
var startTime = t.responseEnd;
var endTime = t.loadEventEnd;
var loadTime = endTime - startTime;

var performance_data = {
    "start": startTime,
    "stop": endTime,
    "loadTime": loadTime,
    "pt": t
}

var performanceData = JSON.stringify(performance_data);
var data = JSON.stringify({
    userAgent: navigator.userAgent, 
    language: navigator.language, 
    hello: "kill me please",
    hi: "hehe",
    sessionID: document.cookie.split("=")[1],
    performanceData: performanceData,
    staticData: JSON.stringify(static_data)
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



function start() {
    console.log("i will fucking shoot myself");
    var t = window.performance.timing;
    var startTime = t.responseEnd;
    var endTime = t.loadEventEnd;
    var loadTime = endTime - startTime;

    var performance_data = {
        "start": startTime,
        "stop": endTime,
        "loadTime": loadTime,
        "pt": t
    }
    var performanceData = JSON.stringify(performance_data);
    var data = JSON.stringify({
        userAgent: navigator.userAgent, 
        language: navigator.language, 
        hello: "kill me please",
        hi: "hehe",
        sessionID: document.cookie.split("=")[1],
        performanceData: performanceData
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


// function test() {

//     var data = JSON.stringify({
//         userAgent: navigator.userAgent, 
//         language: navigator.language, 
//         hi: "hehe",
//         sessionID: document.cookie.split("=")[1]
//     });

//     var url = "https://us-central1-cse135-pa3.cloudfunctions.net/postSession";
//     xhr.open('POST', url, true);
//     xhr.send(data);
// }
var xhrTest = new XMLHttpRequest();
function test(){
    console.log("hello")       
    var t = window.performance.timing;
    var startTime = t.responseEnd;
    var endTime = t.loadEventEnd;
    var loadTime = endTime - startTime;

    var performance_data = {
        "start": startTime,
        "stop": endTime,
        "loadTime": loadTime,
        "pt": t
    }

    var url = document.URL;
    var idx = url.lastIndexOf("/") + 1
    var idx2 = url.lastIndexOf(".")
    var name = url.slice(idx, idx2)

    var performanceData = JSON.stringify(performance_data);
    var testData = JSON.stringify({
        userAgent: navigator.userAgent, 
        language: navigator.language, 
        sessionID: document.cookie.split("=")[1],
        performanceData: "oasidjasoidjasoidj"
    });

    var url = "https://us-central1-cse135-pa3.cloudfunctions.net/postSession";

    xhrTest.onreadystatechange = function () {
        if(xhrTest.readyState === XMLHttpRequest.DONE && xhrTest.status === 200) {
            console.log(xhrTest.responseText);
            //document.cookie = "sessionID=" + xhr.responseText
        }
    };

    xhrTest.open('POST', url, true);
    xhrTest.send(testData);

    console.log(xhrTest.response)
    console.log(performance_data)
    console.log("hioaijdoasidajd");
  }


  
let events_list = []

function stringifyEvent(e) {
    const obj = {};
    for (let k in e) {
      obj[k] = e[k];
    }
    return JSON.stringify(obj, (k, v) => {
      if (v instanceof Node) return 'Node';
      if (v instanceof Window) return 'Window';
      return v;
    }, ' ');
  }

window.addEventListener('click', (event) => {
    event = event || window.event;
    let temp = stringifyEvent(event);
    events_list.push(temp);
})


window.addEventListener('mouseover', (event) => {
    event = event || window.event;
    events_list.push(stringifyEvent(event));
})


let keydown = 0;
window.addEventListener('keydown', (event) => {
    event = event || window.event;
    events_list.push(stringifyEvent(event));
})


let scroll = 0;
window.addEventListener('scroll', (event) => {
    event = event || window.event;
    events_list.push(stringifyEvent(event));
})


window.addEventListener('beforeunload', (event) => {
    event = event || window.event;
    events_list.push(stringifyEvent(event));
})

window.onbeforeunload = () => {
    var url = document.URL;

    let dynamic_data = {
        "events": events_list
    }

    var data = JSON.stringify({
        userAgent: navigator.userAgent, 
        language: navigator.language, 
        hello: "kill me please",
        hi: "hehe",
        sessionID: document.cookie.split("=")[1],
        performanceData: performanceData,
        dynamicData: JSON.stringify(dynamic_data)
    });

    var url = "https://us-central1-cse135-pa3.cloudfunctions.net/postSession";

    xhr.onreadystatechange = function () {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          console.log(xhr.responseText);
        //   document.cookie = "sessionID=" + xhr.responseText
        }
    };

    xhr.open('POST', url, true);
    xhr.send(data);

    console.log(xhr.response)
    // localStorage.setItem(name + "_dynamic_data", JSON.stringify(dynamic_data));
}