//basic route
var express = require('express')
var app = express()
//respond with "Hello"
app.get('/', function (req, res) {
    res.send('Hello!')
})

//res.sendStatus(404); //equivalent to res.status (404).send('Not Found')
