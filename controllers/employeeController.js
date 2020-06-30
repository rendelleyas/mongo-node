const express = require('express');
var router = express.Router();

//require the model
require ('../models/Employee');


//database, model
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');



//render the file
router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "Insert Employee"
    });
});

//post request the file
router.post('/', (req, res) => {
    if(req.body._id == '')
        insertEmployee(req, res);
    else
        updateEmployee(req, res);
});


//inserting data
function insertEmployee(req, res){
    var employee = new Employee();
    employee.fullname = req.body.fullname;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err, doc) => {
        if (!err)
            res.redirect('employee/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}


//update employee data
function updateEmployee(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true, 'useFindAndModify': false}, (err, doc) =>{
        if(!err) { 
            res.redirect('employee/list')
        }else{
            //validation error
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    })
}

//input validation
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

//Getting data from db
router.get('/list', (req, res) => {
    //query get data
    Employee.find((err, docs) => {
        if (!err) {
            res.render('employee/list', {
                list: docs.map(doc => doc.toJSON())
            });
        } else {
            console.log('Error in retrieving employee: ' + err);
        }
    })
});


//choose specific data  
router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) =>{
        if(!err){
            res.render("employee/addOrEdit", {
                viewTitle: "Update Employee",
                employee: doc.toJSON()
            });
        }
    })
});

//delete data
router.get('/delete/:id', (req, res) => {
    Employee.findOneAndDelete(req.params.id, (err, doc) =>{
        if(!err)
            res.redirect('/employee/list');
        else
        console.log('Error in deletion: '+ err);
    })
})


//naga paminaw sa routes req
module.exports = router;    