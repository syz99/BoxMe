const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

// API file for interacting with MongoDB
const api = require('./server/routes/api');

// Parsers (where body parser comes in)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false} ));

// Angular DIST output folder (dist folder location which is generated with ng build)
app.use(express.static(path.join(__dirname, 'dist'))); // essentially, look for the path of 'dist'

// API location
app.use('/api', api);

// send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirnam, 'dist//boxme/index.html'));
});

// set port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));