const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '',
    database : 'smartbrain'
  }
});

db.select('*').from('users')
  .then(data => {
    console.log(data);
  });

const app = express();
app.use(bodyParser.json()); // middleware
app.use(cors());

app.get('/', (req, res) => {
  res.send('its working');
});

// Signin
app.post('/signin', (req,res) => {signin.handleSignin(req, res, db, bcrypt)});

// Register
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

// Get profile
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});

// Image send for score
app.put('/image', (req, res) => {image.handleImage(req, res, db)} );

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)} );



// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
  // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//   // res = false
// });
//
app.listen(process.env.PORT || 3001, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
