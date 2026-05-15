// ================= ALARM ENGINE =================

// Default Thresholds (can be updated from settings)
let HIGH_SETPOINT = 1.0;
let VERY_HIGH_SETPOINT = 5.0;
let DELTA_SETPOINT = 2.0;

let previousField = 0;


// ================= SETTINGS UPDATE =================

function updateAlarmSettings(high, veryHigh, delta){

    if(!isNaN(high)) HIGH_SETPOINT = parseFloat(high);
    if(!isNaN(veryHigh)) VERY_HIGH_SETPOINT = parseFloat(veryHigh);
    if(!isNaN(delta)) DELTA_SETPOINT = parseFloat(delta);

    console.log("Updated Thresholds:",
        HIGH_SETPOINT,
        VERY_HIGH_SETPOINT,
        DELTA_SETPOINT
    );
}


// ================= MAIN ALARM LOGIC =================

function evaluateAlarms(field){

    const absField = Math.abs(field);
    const delta = Math.abs(field - previousField);

    previousField = field;

    // ⚡ Lightning detection
    if(delta > DELTA_SETPOINT){
        applyVisualState("Lightning Detected", "magenta");
        return;
    }

    // 🔴 Very High
    if(absField >= VERY_HIGH_SETPOINT){
        applyVisualState("Very High Field", "red");
        return;
    }

    // 🟡 High
    if(absField >= HIGH_SETPOINT){
        applyVisualState("High Field", "yellow");
        return;
    }

    // 🟢 Normal
    applyVisualState("Normal", "#00ff00");
}



// ================= VISUAL UPDATE =================

function applyVisualState(text, color){

    const alarmBox = document.getElementById("alarmBox");
    const ring = document.getElementById("outerRing");
    const digital = document.getElementById("digitalValue");

    // Ring numbers
    const ringTexts = document.querySelectorAll(".rings-container text");

    // Alarm text
    alarmBox.innerText = text;
    alarmBox.style.background = "#111";
    alarmBox.style.color = color;

    // Ring fill
    if(ring){
        ring.setAttribute("fill", color);
    }

    // Ring numbers color
    ringTexts.forEach(t => {
        t.setAttribute("fill", color);
    });

    // Digital number color
    if(digital){
        digital.style.color = color;
    }

    // Graph line color
    if(typeof setGraphColor === "function"){
        setGraphColor(color);
    }
}