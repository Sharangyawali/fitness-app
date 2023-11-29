;

const accountSid = 'ACd2501210e190bcaf2573743341408a40';
const authToken = '95917db52790401574367c2858196494';
const twilioNumber = '+16185528282';

const twilio = require('twilio')(accountSid, authToken);

const sendOTP=(phoneNumber, otp)=> {
    console.log(phoneNumber,otp)
    const message = `Your OTP is: ${otp}`;

    twilio.messages
        .create({
            body: message,
            from: twilioNumber,
            to: phoneNumber
        })
        .then(message => console.log(`OTP sent: ${message.sid}`))
        .catch(error => console.error(`Error sending OTP: ${error.message}`));
}

module.exports=sendOTP