
//basic route
var express = require('express')
var app = express()
const port = 3000

var people = require('./people.json');

function findUser(userId) {
    var i = 0;
    while (people[i]) {
        if (people[i].id == userId) {
            return people[i];
        }
        i++
    }
    return '404';
}


//respond with "Hello"
app.get('/', (req, res) => res.send('Hello World!'));

app.get('/people', function (req, res) {
    res.status(200).json(people);
})

app.get('/person/:id', (req, res) => {
    var Userid = req.params.id;
    var result = findUser(Userid);
    if (result == "404") {
        res.status(404).send('There is no userid');
    }
    else {
        res.send(result);
    }
});

app.get('/person/:id/name', (req, res) => {
    var Userid = req.params.id;
    var result = findUser(Userid);
    if (result == "404") {
        res.status(404).send('There is no userid');
    }
    else {
        res.send(result.firstName + " " + result.lastName);
    }
});

app.get('/person/:id/years', (req, res) => {
    var Userid = req.params.id;
    var result = findUser(Userid);
    if(result == "404") {
        res.status(404).send('There is no userid');
    }
    else {
        var today = new Date();
        var startDate = result.startDate.split("-");
        var diff_year = today.getFullYear() - Number(startDate[0]);
        if (today.getMonth() - Number(startDate[1]) > 6) {
            diff_year += 1;
        }
        res.send("" + diff_year + " Years of working experience" );
    }
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
