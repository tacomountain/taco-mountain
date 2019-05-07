// Put services here to clean up routes
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const TWILIO_NUMBER = '15184010922';

const sendMessage = (phoneNumber, body, mediaUrl) => {
  return client.messages
    .create({
      body,
      from: TWILIO_NUMBER,
      mediaUrl,
      to: `1${phoneNumber}`
    });
};

module.exports = {
  sendMessage
};
