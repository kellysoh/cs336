
//basic route
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var fs = require('fs');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;

app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



MongoClient.connect('mongodb://cs336:' + process.env.MONGO_PASSWORD + '@ds253713.mlab.com:53713/cs336', function (err, client) {
    if (err) {
        console.log(err);
    }
    var db = client;
    // Additional middleware which will set headers that we need on each request.

    app.use(function (req, res, next) {
        // Set permissive CORS header - this allows this server to be used only as
        // an API server in conjunction with something like webpack-dev-server.
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Disable caching so we'll always get the latest comments.
        res.setHeader('Cache-Control', 'no-cache');
        next();
    });


    app.get('/', function(req, res) {
        var collection = db.collection('people');
        collection.find({}).toArray(function (err, array) {
            res.json(array);
        });
    });

    app.post('/', function (req, res) {
        var collection = db.collection('people');
        
        var newPerson = {
            id: req.body.id,
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            startDate: req.body.startdate
        };
        collection.insertOne(newPerson);
    });

    app.get('/people', function (req, res) {
        var collection = db.collection('people');
        collection.find({}).toArray(function (err, array) {
            res.json(array);
        });
    });

    app.post('/people', function (req, res) {
        var collection = db.collection('people');
        collection.find({}).toArray(function (err, array) {
            res.json(array);
        });
        var person_list = {
            id: req.body.id,
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            startDate: req.body.startdate
        };
        collection.insertOne(person_list);
    });
    /*curl -X POST localhost:3000/people -d '{"id": "NL", "firstName": "Nelson", "lastName": "Lee", "startDate": "2001-02-24"}' -H 'Content-Type: application/json'*/
    app.get('/person/:id', (req, res) => {
        var collection = db.collection('people');
        var Userid = req.params.id;
        collection.find({ id: Userid }, function (err, result) {
            if (err) {
                console.log(err);
            }
            if (result) {
                result.toArray(function (err, array) {
                    res.json(array);
                });
            } else {
                res.status(404).send('There is no userid');
            }
        });
    });

    app.delete('/person/:id', (req, res) => {
        var collection = db.collection('people');
        var Userid = req.params.id;
        try {
            collection.deleteOne({ "id": Userid });
        } catch (e) {
            print(e);
        }
    })
    /*curl - X DELETE localhost: 3000 / person / NL - H 'Content-Type: applicaion/json' */
    app.post('/person/:id', function (req, res) {
        var collection = db.collection('people');
        var Userid = req.params.id;
        collection.update(
            { "id": Userid },
            {
                $set: {
                    "id": req.body.id, "firstName": req.body.firstname,
                    "lastName": req.body.lastname, "startDate": req.body.startdate
                }
            }
        )
        res.send("Changed the person with ID=" + req.params.id);
    });

    /* curl -X POST localhost:3000/person/KO -d '{"id":"KO", "firstName": "Seeun", "lastName":"Oh", "startDate":"1996-04-20"}' -H 'Content-Type: application/json'*/
    app.get('/person/:id/name', (req, res) => {
        var collection = db.collection('people');
        var Userid = req.params.id;
        collection.findOne({ id: Userid } , function (err, result) {
            if (err) {
                console.log(err);
            }
            if (result) {
                res.send(result.firstName + " " + result.lastName);
            } else {
                res.status(404).send('There is no userid');
            }
        });
    });

    app.get('/person/:id/years', (req, res) => {
        var collection = db.collection('people');
        var Userid = req.params.id;
        collection.findOne({ id: Userid }, function (err, result) {
            if (err) {
                console.log(err);
            }
            if (result) {
                var today = new Date();
                var startDate = result.startDate.split("-");
                var diff_year = today.getFullYear() - Number(startDate[0]);
                if (today.getMonth() - Number(startDate[1]) > 6) {
                    diff_year += 1;
                }
                res.send("" + diff_year + " Years of working experience");
            } else {
                res.status(404).send('There is no userid');
            }
        });
    });

    app.listen(app.get('port'), function () {
        console.log('Server started: http://localhost:' + app.get('port') + '/');
    });
});
