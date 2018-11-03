
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
var people = '[' + 
    '{"id":"JB","firstName": "John","lastName": "Backus","startDate": "2012-04-21"},' +
    '{"id": "KO","firstName": "Kelly","lastName": "Oh","startDate": "1996-04-20"},' +
    '{"id": "JF","firstName": "James","lastName": "Fisher","startDate": "1980-09-24"},' +
    '{"id": "CS","firstName": "Chris","lastName": "Stehouwer","startDate": "1999-02-14"},' +
    '{"id": "LE","firstName": "Laura","lastName": "Ebels","startDate": "2007-05-23"}]'

var pList = JSON.parse(people);

function findUser(userId) {
    var i = 0;
    while (pList[i]) {
        if (pList[i].id == userId) {
            return pList[i];
        }
        i++
    }
    return '404';
}

//respond with "Hello"
app.get('/', (req, res) => res.send('Hello World!'));

app.get('/people', function (req, res) {
    res.json(pList);
})

app.post('/people', function (req, res) {
    
    var person_list = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        startDate: req.body.startDate
    };
    pList.push(person_list);

});
/*curl -X POST localhost:3000/people -d '{"id": "NL", "firstName": "Nelson", "lastName": "Lee", "startDate": "2001-02-24"}' -H 'Content-Type: application/json'*/
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
    var i = 0;
    for (var i = 0; i < pList.length; i++) {
        if (pList[i].id == Userid) {
            pList.splice(i, 1);
        }
    }
    if (result == "404") {
        res.status(404).send("Not found");
    } 
})
/*curl - X DELETE localhost: 3000 / person / NL - H 'Content-Type: applicaion/json' */
app.post('/person/:id', function (req, res) {
    var Userid = req.params.id; 
    var result = findUser(Userid);
    for (var i = 0; i < pList.length; i++) {
        if (pList[i].id == Userid) {
            pList[i].id = req.params.id;
            pList[i].firstName = req.body.firstName;
            pList[i].lastName = req.body.lastName;
            pList[i].startDate = req.body.startDate;
            res.send("changed the Person with ID=" + req.params.id);
        }
    }
    if (result == 404) {
        res.status(404);
    }
})
/* curl -X POST localhost:3000/person/KO -d '{"id":"KO", "firstName": "Seeun", "lastName":"Oh", "startDate":"1996-04-20"}' -H 'Content-Type: application/json'*/
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
