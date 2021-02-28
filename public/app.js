const socket = io();

let counterLabel = 0;

socket.on('arduino', dataSerial => {
    console.log(dataSerial);
    const counter = document.getElementById('counter');
    counter.innerText = '';
    let textH1 = counter.innerText + dataSerial;
    counter.innerText = textH1;

    myChart.data.labels.push(counterLabel);
    myChart.data.datasets.forEach(dataset => {
        dataset.data.push(dataSerial);
    });

    counterLabel++;
    myChart.update();

});

var ctx = document.getElementById('canvas').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Puerto serial'],
        datasets: [{
            label: "Serial seconds",
            backgroundColor: "rgba(109, 39, 122, 0.8)",
            borderColor: "rgb(68, 25, 77)",
            data: []
        }]
    },
    options: {}
});
