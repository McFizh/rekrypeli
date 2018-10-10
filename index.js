'use strict';

const Hapi = require('hapi');
const Good = require('good');

require('dotenv').config();

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const init = async function() {

    //
    const server = new Hapi.Server({
        port: 8080
    });

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

