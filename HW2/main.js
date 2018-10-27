
//basic route
var express = require('express');
var app = express();
const http_status = require('http-status-codes');
var bodyParser = require('body-parser')
const port = 3000;
var fs = require('fs');
var path = require('path');

app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var people = require('./public/people.json');
var p_path = path.join(__dirname, '/public/people.json');
var peopleList = [];
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

fs.readFile(p_path, function (err, data) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    peopleList = JSON.parse(data);
});

//respond with "Hello"
app.get('/', (req, res) => res.send('Hello World!'));

app.get('/people', function (req, res) {
    res.json(people);
})

app.post('/people', function (req, res) {
    $.getJSON('/people.json', function (data) {
        var person_list = {
            id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            startDate: req.body.startDate
        };
        peopleList.push(person_list);

        var newPerson = JSON.stringify(p_path);

        fs.writeFile(p_path, newPerson, function (err) {
            console.log(err)
        });
    });
});

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

app.delete('/person/:id', (req, res) => {
    var Userid = req.params.id;
    var result = findUser(Userid);
    if (result == "404") {
        res.status(404).send("Not found");
    } 
    else {
        delete result;
    }
})

app.post('/person/:id', function (req, res) {
    var Userid = req.params.id; 
    var result = findUser(Userid);
    if (result == 404) {
        res.status(404);
    }
    res.send("changed the Person with ID=" + req.params.id);
    
})

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
