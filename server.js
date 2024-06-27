//subscribe for initially page will open the redirect to index_1.html
// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const app = express();
// const port = 3000;

// app.use(bodyParser.urlencoded({ extended: true }));

// mongoose.connect('mongodb://localhost:27017/newsletter_db');

// const subscriberSchema = new mongoose.Schema({
//     email: { type: String, required: true },
//     subscribed_at: { type: Date, default: Date.now }
// });

// const Subscriber = mongoose.model('Subscriber', subscriberSchema);

// app.post('/subscribe', async (req, res) => {
//     try {
//         const email = req.body.email;
//         const newSubscriber = new Subscriber({ email: email});
//         await newSubscriber.save();
//         console.log(`Received email: ${email}`);
//         // console.log("subscribe succesful")
//         res.redirect('http://127.0.0.1:5500/html/index_1.html')
//         // res.send('Subscribed successfully!');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Subscription failed. Please try again.');
//     }
// });

// app.listen(port, () => {
//     console.log(`Server started on port ${port}`);
// });














//databse for both login and signup page

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
const mongoURI = 'mongodb://localhost:27017/authDB';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`MongoDB connected: ${mongoURI}`))
  .catch(err => console.log(`MongoDB connection error: ${err}`));

// User schema and model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rememberMe: Boolean
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/signup', async (req, res) => {
  const { email, password /*, rememberMe*/ } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
     const newUser = new User({ email, password: hashedPassword, /*rememberMe*/ });
    await newUser.save();
    //-----------just checking--------------
    console.log(`receive mail: ${email}`);
    console.log(`receive password: ${password}`);
   // --------------END---------------------
    res.json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    res.status(400).json({ message: 'Error creating user', error: err });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
      
    }
  } catch (err) {
    res.status(400).json({ message: 'Error during login', error: err });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
