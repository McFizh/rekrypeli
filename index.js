'use strict';
const Hapi = require('@hapi/hapi');

require('dotenv').config();

const mongo = require('./lib/database');
const routes = require('./lib/routes');
const mailer = require('./lib/emailer');

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const init = async () => {

    // Connect to database
    await mongo.connect();

    // Initialize hapi server
    const server = new Hapi.Server({
        port: process.env.PORT || 8080
    });

    // Register basic auth module
    await server.register( require('hapi-auth-bearer-token') );

    // Register routes
    routes.register(server);

    // Start the server
    await server.start();

    return server;
};

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// Initialize mailgun connection
mailer.initMailer();

// Start hapi server
init().then((server) => {
    console.log('>> Server running on '+server.info.host+':'+server.info.port);
});

