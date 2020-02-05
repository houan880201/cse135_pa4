console.log("Connected to reporter.js")

let user_agent = navigator.userAgent;
let user_language = navigator.language;
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
    "user-agent": user_agent,
    "user-lang": user_language,
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

localStorage.setItem('static_data', JSON.stringify(static_data))

console.log(static_data)


/* 
Performance Data 
- page loading information [PerformanceTiming]
- initial start loading times
- end loading time
- total time taken
*/

/* PERFORMANCE DATA */
window.onload = function(){

    setTimeout(function(){       
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


        localStorage.setItem(name + '_performance_data', JSON.stringify(performance_data));
        console.log(performance_data)
    }, 0);

  }

/*
Dynamic Data
- clicks
- mouse movements
- keystrokes
- scrolling (window)
- page unloading (beforeunload)
- idle time
    only record if idle time is greater than 2 seconds

Everything should be store in the localStorage 
- using an array of objects [JSON]
*/


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
    var idx = url.lastIndexOf("/") + 1;
    var idx2 = url.lastIndexOf(".");
    var name = url.slice(idx, idx2);

    let dynamic_data = {
        "events": events_list
    }

    localStorage.setItem(name + "_dynamic_data", JSON.stringify(dynamic_data));
}


function idleTimer() {
    let timer;
    let idle = 0;
    let pause = 0;

    let interval;

    // window.onload = resetTimer;
    window.onmousemove = resetTimer; 
    window.onmousedown = resetTimer; 
    window.onclick = resetTimer;     
    window.onscroll = resetTimer;  
    window.onkeypress = resetTimer;  

    function idle_ing() {
        console.log("IDLE START")
        interval = setInterval(setTime, 1000);
    }

   function resetTimer() {
        clearTimeout(timer);
        pause = idle;
        if (pause > 0){
            console.log("User was idle for " + pause);
            let e = {
                "type": "idle",
                "time_in_seconds": (pause+2) + "s",
            }

            events_list.push(JSON.stringify(e));
            // localStorage.setItem("lastPause", pause);
        }
        clearInterval(interval );
        idle = 0;
        timer = setTimeout(idle_ing, 2000);  // time is in milliseconds (1000 is 1 second)
    }


    function setTime() {
        ++idle;
        console.log(idle)
    }
}

idleTimer();
