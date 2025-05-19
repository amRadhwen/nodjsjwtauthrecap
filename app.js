const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());


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
app.use(authRoutes);

// cookies
/*
app.get("/set-cookies", (req, res)=>{
    //res.header("Set-Cookie", "newUser=true");
    res.cookie("newUser", false);
    res.cookie("isAdmin", true, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true});
    res.send("You got the cookies !");
})

app.get("/get-cookies", (req, res)=>{
    const cookies = req.cookies;
    console.log(cookies);
    res.send(cookies);
})
*/