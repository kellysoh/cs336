

const express = require('express');
const app = express();
const http_status = require('http-status-codes');
const bodyParser = require('body-parser');


const port = 3000


app.use(express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//-----------------------------
// HTTP route and return code examples. 

app.get('/', (req, res) => res.send('Hello'));

app.get('/request', function(req, res) {
	res.send('Got a GET request')
	console.log('Hello, GET!')
});

app.head('/request', function(req, res){
	res.send('Got a HEAD request')
	console.log('Hello, HEAD!')
});

app.post('/request', function(req, res){
	res.send('Got a POST request')
	console.log('Hello, POST!')
});

app.put('/request', function (req, res) {
	res.send('Got a PUT request at /request')
	console.log('Hello, PUT!')
});

app.delete('/request', function (req, res) {
	res.send('Got a DELETE request at /request')
	console.log('Hello, DELETE!')
});

//request methods
app.get('/noContent', function(req, res) {
	res.sendStatus(http_status.NO_CONTENT);
});

app.get('/broken', function(req, res) {
	res.sendStatus(http_status.BAD_REQUEST);
});

//----------------------------------------
// HTTP form example

app.get('/forms', function (req, res) {
    res.sendFile('/public/forms/index.html');
});

app.post('/forms', function (req, res) {
    res.send('Hello, form POST!<br>Posted message: <code>'
        + req.body.user_message + '</code>');
});

app.all('/secret', function(req,res, next) {
	console.log('You are accessing the secret section!')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))