'use strict'

const express = require('express'); 
const server = express();
const routes = require('./routes/route');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config');

// middlwares
server.use(morgan('dev'));
server.use(bodyParser.json({limit: '5mb'}));
server.use(bodyParser.urlencoded({limit: '5mb', extended: true }));

// configurar cabeceraas y cors
server.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next()
})



// settings
server.set('superSecret', config.secret)


// static files
server.use(express.static(path.join(__dirname, 'public/dist')));



// routes
server.use('/api', routes);

server.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, 'public/dist/index.html'));
})


module.exports = server;
