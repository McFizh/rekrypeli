const mailer = require('../lib/emailer');
const mongo = require('../lib/database');

const scoreHandler = async (request, h) => {
    const formData = {
        firstname: request.payload.firstname,
        lastname: request.payload.lastname,
        email: request.payload.email,

        intrest1: request.payload.intrest1,
        intrest2: request.payload.intrest2,
        intrest3: request.payload.intrest3,
        intrest4: request.payload.intrest4,

        permission: request.payload.permission,
        code: request.payload.code,
        time: request.payload.time
    };

    // Store results to mongo
    if(mongo.databaseEnabled) {
        const score = new mongo.scoreModel(formData);

        try {
            await score.save();
        } catch(err) {
            return h.response('DBFAILURE').code(500);
        }
    }

    // Send results
    const result = mailer.sendResults(formData);

    if(!result) {
        return h.response('MAILERFAILURE').code(500);
    }

    return h.response('OK').code(201);
};

const scoreRetreiver = async () => {
    return mongo.databaseEnabled ? await mongo.scoreModel.find() : [];
};

module.exports = {
    scoreHandler,
    scoreRetreiver,
};