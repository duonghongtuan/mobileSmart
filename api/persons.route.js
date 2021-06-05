const express = require('express');
const personRoutes = express.Router();

// Require Business model in our routes module
let Person = require('./business.model');

// Defined store route
personRoutes.route('/add').post(function (req, res) {
    let person = new Person(req.body);
    person.save()
        .then(person => {
            res.status(200).json({ 'person': 'person in added successfully' });
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

// Defined get data(index or listing) route
personRoutes.route('/').get(function (req, res) {
    Person.find(function (err, persons) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(persons);
        }
    });
});

// Defined edit route
personRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Person.findById(id, function (err, person) {
        res.json(person);
    });
});
personRoutes.route('/login').post(function (req, res, user) {
    let name = req.body.name;
    let password = req.body.password;
    Person.findOne({ name: name, password: password }, function (err, person) {
        if (person) {
            res.send('Success')
        }
        else {
            res.send('Wrong username password')
        }
    });
});

//  Defined update route
personRoutes.route('/update/:id').post(function (req, res) {
    Person.findById(req.params.id, function (err, person) {
        if (!person)
            res.status(404).send("data is not found");
        else {
            console.log(person);
            person.name = req.body.name;
            person.email = req.body.email;
            person.password = req.body.password;

            person.save().then(person => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

// Defined delete | remove | destroy route
personRoutes.route('/delete/:id').get(function (req, res) {
    Person.findByIdAndRemove({ _id: req.params.id }, function (err, person) {
        if (err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = personRoutes;