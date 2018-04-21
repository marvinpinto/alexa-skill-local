#!/usr/bin / env node

const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const colors = require('colors');


const server = express();
server.use(bodyParser.json());


const filePath = process.argv[2];
const port = process.argv[3];

const handler = require(filePath).handler;

server.post('/', (req, res) => {
    // Create dummy lambda context with fail and succeed functions
    const context = {
        fail: () => res.sendStatus(500),
        succeed: data => res.send(data),
    };

    // Call handler function in lambda entry file
    handler(req.body, context);
});

server.listen(port , function () {
    console.log(colors.green('Mock Lambda Service is running on port ' + port))
});