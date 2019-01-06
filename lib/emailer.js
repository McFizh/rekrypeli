const NodeMailer = require('nodemailer');
var emailTransporter;

// :::::::::::::::::::::::::::::::::::::::::::::

function initMailer() {

    const smtpUname = process.env.SMTP_UNAME;
    const smtpPass = process.env.SMTP_PASS;
    const dstEmail = process.env.SMTP_DST;

    if(!smtpUname || !smtpPass) {
        /* eslint-disable no-console */
        console.log('>> Sendgrid SMTP username or password not set.. exiting ..');
        /* eslint-enable no-console */
        process.exit(1);
    }

    if(!dstEmail) {
        /* eslint-disable no-console */
        console.log('>> Destination email address not set.. exiting ..');
        /* eslint-enable no-console */
        process.exit(1);
    }


    emailTransporter = NodeMailer.createTransport( {
        host: 'smtp.sendgrid.net',
        port: 2525,
        secure: false,
        auth: {
            user: smtpUname,
            pass: smtpPass
        }
    });

}

async function sendResults(data) {
    var mailbody = process.env.SMTP_BODY;

    mailbody = mailbody.replace(/%fname%/,data.firstname)
                       .replace(/%lname%/,data.lastname)
                       .replace(/%email%/,data.email)
                       .replace(/%i1%/,data.intrest1)
                       .replace(/%i2%/,data.intrest2)
                       .replace(/%i3%/,data.intrest3)
                       .replace(/%i4%/,data.intrest4)
                       .replace(/%pe%/,data.permission)
                       .replace(/%time%/,data.time)
                       .replace(/%code%/,data.code);

    const mailContent = {
        from: process.env.SMTP_SRC,
        to: process.env.SMTP_DST,
        subject: process.env.SMTP_SUBJECT,
        text: mailbody
    };

    try {
        await emailTransporter.sendMail(mailContent);
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}

// :::::::::::::::::::::::::::::::::::::::::::::

module.exports = {
    initMailer: initMailer,
    sendResults: sendResults
};
