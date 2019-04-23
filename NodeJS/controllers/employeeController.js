const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Employee } = require('../models/employee');

// => localhost:3000/employees/
// READ
router.get('/', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error in Retriving Employees: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// => localhost:3000/employees/id
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No records with given id: ${req.params.id}`);

    Employee.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error in Retriving Employee:' + JSON.stringify(err, undefined, 2));
        }
    });
});
// CREATE
router.post('/', (req, res) => {
    var emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    });
    emp.save((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error in Employee Save: ' + JSON.stringify(err, undefined, 2));
        }
    })
});

// UPDATE
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No records with given id: ${req.params.id}`);
    var emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    };
    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Employee Update:' + JSON.stringify(err, undefined, 2));
        }
    });
});

// DELETE
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No records with given id: ${req.params.id}`);
    Employee.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Employee Delete:' + JSON.stringify(err, undefined, 2));
        }
    });
});


module.exports = router;