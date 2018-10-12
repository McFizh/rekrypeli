const Boom = require('boom');
const apiController = require('../controllers/apiController');

function register(server) {

    server.route([{
        method: 'POST',
        path: '/api/scores',
        config: {
            handler: apiController.scoreHandler,
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        }
    }]);

}

module.exports = {
    register: register
};
