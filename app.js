const express = require('express');
const mongoose = require('mongoose');

const app = express();

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = "mongodb://127.0.0.1:27017/nodejwtrecap";
mongoose.connect(dbURI)
  .then((result) => {
    console.log("Connected to MongoDB");
    app.listen(3000, ()=>{
        console.log("Server is listening on port 3000");
    })
    })
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));