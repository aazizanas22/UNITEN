// ================= CHART ENGINE =================

let chart;
let chartData = [];
let chartLabels = [];

let amplitudeRange = 5;        // Default Y range
let timeWindowSeconds = 300;   // Default 5 minutes

function initializeChart(){

    const ctx = document.getElementById("chart").getContext("2d");

    chart = new Chart(ctx,{
        type:"line",
        data:{
            labels: chartLabels,
            datasets:[{
                data: chartData,
                borderColor:"#00ff00",
                borderWidth:2,
                pointRadius:0,
                tension:0
            }]
        },
        options:{
            animation:false,
            responsive:true,
            maintainAspectRatio:false,
            scales:{
                x:{
                    ticks:{
                        color:"#aaa",
                        maxTicksLimit:8
                    },
                    grid:{color:"#222"}
                },
                y:{
                    min:-amplitudeRange,
                    max: amplitudeRange,
                    ticks:{color:"#aaa"},
                    grid:{color:"#333"}
                }
            },
            plugins:{
                legend:{display:false},
                zoom:{
                    pan:{enabled:true,mode:'x'},
                    zoom:{wheel:{enabled:true},mode:'x'}
                }
            }
        }
    });
}

function updateChart(field){

    const now = new Date();
    const timeString = now.toLocaleTimeString();

    chartData.push(field);
    chartLabels.push(timeString);

    // Remove old data beyond time window
    const maxPoints = timeWindowSeconds * 10; // 10 samples/sec approx

    if(chartData.length > maxPoints){
        chartData.shift();
        chartLabels.shift();
    }

    chart.update('none');
}

function setGraphColor(color){
    chart.data.datasets[0].borderColor = color;
    chart.update('none');
}

document.addEventListener("DOMContentLoaded",()=>{

    initializeChart();

    // AMPLITUDE CONTROL
    document.getElementById("ampSelect").addEventListener("change",e=>{
        amplitudeRange = parseFloat(e.target.value);
        chart.options.scales.y.min = -amplitudeRange;
        chart.options.scales.y.max = amplitudeRange;
        chart.update();
    });

    // TIME RANGE CONTROL
    document.getElementById("timeSelect").addEventListener("change",e=>{
        timeWindowSeconds = parseInt(e.target.value);
    });

});