// ================= FIREBASE LAYER =================

firebase.initializeApp({
    databaseURL: "https://fyp1-cc06a-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = firebase.database();

// Listen to EVERYTHING under Ramadan
db.ref("SSSS").on("child_added", snapshot => {

    console.log("New Push ID detected");

    const pushNode = snapshot.val();

    if(!pushNode.batch) return;

    // Now listen to batch inside that push ID
    snapshot.ref.child("batch").on("child_added", batchSnap => {

        let sample = batchSnap.val();
        let voltage = null;

        if(typeof sample === "object"){
            const firstKey = Object.keys(sample)[0];
            voltage = parseFloat(sample[firstKey]);
        }
        else if(typeof sample === "number"){
            voltage = parseFloat(sample);
        }

        if(voltage !== null && !isNaN(voltage)){
            processVoltage(voltage);
        }

    });

});