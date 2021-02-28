const express = require('express');
const app = express();
const http = require('http').createServer(app);
app.use(express.static(__dirname + '/public'));
let expressPort = process.env.PORT || 3000; //Unnecesary env port, no deploy.

// Socket:
const io = require('socket.io')(http);


// Arduino Stuff:
const SerialPort = require('serialport');
const ReadLine = SerialPort.parsers.Readline;
const port = new SerialPort('COM3', { baudRate: 9600 });
const parser = port.pipe(new ReadLine({ delimiter: '\r\n' }));

parser.on('data', data => {
    console.log(data);
    io.emit('arduino', data);
});

parser.on('error', error => {
    console.log(error);
});

// Express stuff
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/');
});


http.listen(expressPort, () => {
    console.log(`Listening on port: ${expressPort}`);
});