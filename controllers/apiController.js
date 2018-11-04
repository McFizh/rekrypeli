const mailer = require('../lib/emailer');
const mongo = require('../lib/database');
const Boom = require('boom');

async function scoreHandler(request, h) {

    // Store results to mongo
    let score = new mongo.scoreModel({
        name: request.payload.name,
        code: request.payload.code,
        timespent: request.payload.time
    });

    try {
        await score.save();
    } catch(err) {
        return h.response("DBFAILURE").code(500);
    }

    // Send results
    const result = mailer.sendResults(
        request.payload.name,
        request.payload.time,
        request.payload.code
    );

    if(!result) {
        return h.response("MAILERFAILURE").code(500);
    }

    return h.response("OK").code(201);
}

function scoreRetreiver(request, h) {
    let scores = mongo.scoreModel.find();

    return scores;
}

module.exports = {
    scoreHandler: scoreHandler,
    scoreRetreiver: scoreRetreiver
};

