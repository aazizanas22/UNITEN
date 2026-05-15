// ================= PROCESSING ENGINE =================

const BASELINE_WINDOW = 200;
const SENSOR_SENSITIVITY = 50;  // adjust based on calibration

let voltageBuffer = [];
let baseline = null;

function processVoltage(voltage){

    voltageBuffer.push(voltage);

    if(voltageBuffer.length > BASELINE_WINDOW){
        voltageBuffer.shift();
    }

    if(voltageBuffer.length === BASELINE_WINDOW){
        baseline = voltageBuffer.reduce((a,b)=>a+b) / BASELINE_WINDOW;
    }

    if(baseline === null) return;

    // Proper field calculation
    let field = (voltage - baseline) / SENSOR_SENSITIVITY;

    updateDisplay(field);
    updateChart(field);
    evaluateAlarms(field);
}

function updateDisplay(field){
    document.getElementById("digitalValue").innerText = field.toFixed(2);
}