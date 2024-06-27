const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const cors= require('cors');
const dotenv= require('dotenv').config();
const port=3002;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);

app.post('/send-sms', (req, res) => {
  const { to, message } = req.body;

  client.messages.create({
    body: message,
    to: to,  // Text this number
    from: '+16672015727' // From a valid Twilio number
  })
  .then((message) => res.status(200).send(`Message sent: ${message.sid}`))
  .catch((error) => res.status(500).send(`Error: ${error.message}`));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
