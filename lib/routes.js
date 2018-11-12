const Boom = require('boom');
const Joi = require('joi');
const apiController = require('../controllers/apiController');

async function validate(request, token, h) {
    return {
        isValid: ( token === process.env.APIKEY && token !== "" ) ? true:false,
        credentials: { allow: true }
    }
}

function register(server) {

    server.auth.strategy('token', 'bearer-access-token', { allowQueryToken: false, validate });

    server.route([{
        method: 'GET',
        path: '/api/scores',
        config: {
            handler: apiController.scoreRetreiver,
            auth: "token"
        }
    },{
        method: 'POST',
        path: '/api/scores',
        config: {
            handler: apiController.scoreHandler,

            validate: {
                payload: {
                    firstname: Joi.string().required(),
                    lastname: Joi.string().required(),
                    email: Joi.string(),
                    intrest1: Joi.boolean(),
                    intrest2: Joi.boolean(),
                    intrest3: Joi.boolean(),
                    intrest4: Joi.boolean(),
                    permission: Joi.boolean(),
                    code: Joi.string().min(3).required(),
                    time: Joi.number().required()
                }
            },

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
