'use strict';

const Hapi = require('hapi');
const Good = require('good');

const mongo = require('./lib/database');
const routes = require('./lib/routes');

require('dotenv').config();

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const init = async function() {

    // Connect to database
    await mongo.connect();

    // Initialize hapi server
    const server = new Hapi.Server({
        port: 8080
    });

    // Register routes
    routes.register(server);

    // Start the server
    await server.start();
    return server; 
};

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
init().then((server) => {
    console.log('>> Server running on '+server.info.host+':'+server.info.port);
});

