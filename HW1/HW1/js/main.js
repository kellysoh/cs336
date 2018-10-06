//basic route
var express = require('express')
var app = express()
//respond with "Hello"
app.get('/', function (req, res) {
    res.send('Hello!')
})
app.get('/people', function (req, res) {
    res.render('people.json')
})
app.listen(5656, () => {
    console.log('http://localhost:5656')
})


const port = process.env.PORT || 5656;
app.listen(port, () => {
    console.log('http://localhost:${port}')
})
res.sendStatus(404); //equivalent to res.status (404).send('Not Found')
