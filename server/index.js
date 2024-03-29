const express = require('express');
const ReactopyaServer = require('../reactopya/js/ReactopyaServer');

var app = express();

//setting middleware
app.use(express.static(__dirname + '/../dist'));


const port = process.env.PORT || 6060;
let server = app.listen(port);
console.info(`Reactopya gallery server is listening on port ${port}`);

const WSS = new ReactopyaServer();
WSS.start({server: server});



