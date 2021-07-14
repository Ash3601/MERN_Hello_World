const dotenv = require('dotenv');
const express = require('express');
const app = express();
dotenv.config({path:'./config.env'});
require('./db/conn');

const PORT=process.env.PORT;


// Middleware
// Will be used to identify if the user is logged in or not
const isUserLogged = (req, res, next) => {
    next();
}

app.get('/', (req, res) => {
    return res.send('Hello World');
});

app.get('/about', isUserLogged,(req, res) => {
    res.send('')
})


app.get('/contact', (req, res) => {
    res.send('')
})

app.get('/signin', (req, res) => {
    res.send('')
})

app.get('/signup', (req, res) => {
    res.send('')
})

app.listen(PORT);