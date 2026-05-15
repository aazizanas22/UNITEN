function openSettings(){
    document.getElementById("settingsModal").style.display = "flex";
}

function closeSettings(){
    document.getElementById("settingsModal").style.display = "none";
}

function saveSettings(){

    let high = parseFloat(document.getElementById("highInput").value);
    let veryHigh = parseFloat(document.getElementById("veryHighInput").value);
    let delta = parseFloat(document.getElementById("deltaInput").value);

    updateAlarmSettings(high, veryHigh, delta);

    closeSettings();
}