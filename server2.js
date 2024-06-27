//subscribe for initially page will open the redirect to index_1.html
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/newsletter_db');

const subscriberSchema = new mongoose.Schema({
    email: { type: String, required: true },
    subscribed_at: { type: Date, default: Date.now }
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

app.post('/subscribe', async (req, res) => {
    try {
        const email = req.body.email;
        const newSubscriber = new Subscriber({ email: email});
        await newSubscriber.save();
        console.log(`Received email: ${email}`);
        // console.log("subscribe succesful")
        res.redirect('http://127.0.0.1:5500/html/index_1.html')
        // res.send('Subscribed successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Subscription failed. Please try again.');
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


