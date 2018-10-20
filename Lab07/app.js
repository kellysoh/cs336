const express = require('express');
const app = express();
const port = 3000;
const bodyParser= require("body-parser")


app.use(express.static("."));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/lab07.html');
});

app.get('/hello', function (req, res) {
    res.send({ "content": "Hello! " + req.query.name });
});


app.listen(port, () => console.log('Example app listening on port ${port}!'));