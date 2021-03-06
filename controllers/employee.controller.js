// Accessing the Service that we just created

var Service = require('../services/employee.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the Employee List

exports.getEmployees = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    try{

        var employees = await Service.getEmployees({}, page, limit)

        // Return the employees list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({status: 200, data: employees, message: "Succesfully Employees Recieved"});

    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: e.message});

    }
}

exports.createEmployee = async function(req, res, next){

    // Req.Body contains the form submit values.

    console.log(req.body)

    var employee = {
        name: req.body.name,
        designation: req.body.designation,
        basesalary: req.body.basesalary
    }


    try{

        // Calling the Service function with the new object from the Request Body

        var createdEmployee = await Service.createEmployee(employee)
        return res.status(201).json({status: 201, data: createdEmployee, message: "Succesfully Created Employee"})
    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: "Employee Creation was Unsuccesfull"})
    }
}

exports.createDeductions = async function(req, res, next){
    // Req.Body contains the form submit values.
    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var employee = {
        id,
        name: req.body.name ? req.body.name:null,
        designation: req.body.designation?req.body.designation:null,
        basesalary: req.body.basesalary?req.body.basesalary:null,
        deductions: req.body.deductions?req.body.deductions:null
    }

    try{

        // Calling the Service function with the new object from the Request Body

        var createdEmployee = await Service.updateEmployee(employee)
        console.log(employee);
        return res.status(200).json({status: 201, data: createdEmployee, message: "Succesfully Updated Deduction"})
    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: "Deduction Updation was Unsuccesfull"})
    }

}

exports.updateEmployee = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var employee = {
        id,
        name: req.body.name ? req.body.name:null,
        designation: req.body.designation?req.body.designation:null,
        basesalary: req.body.basesalary?req.body.basesalary:null,
        deductions: req.body.deductions?req.body.deductions:null
    }

    try{
        var updatedEmployee = await Service.updateEmployee(employee)
        return res.status(200).json({status: 200, data: updatedEmployee, message: "Succesfully Updated Employee"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeEmployee = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await Service.deleteEmployee(id)
        return res.status(204).json({status:204, message: "Succesfully Employee Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}

