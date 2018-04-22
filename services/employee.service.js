// Gettign the Newly created Mongoose Model we just created

var EmpMstModel = require('../models/empmst.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the Employee List

exports.getEmployees = async function(query, page, limit){

    // Options setup for the mongoose paginate

    var options = {
        page,
        limit
    }

    // Try Catch the awaited promise to handle the error

    try {
        var employees = await EmpMstModel.paginate(query, options)

        // Return the employee list that was retured by the mongoose promise

        return employees;

    } catch (e) {

        // return a Error message describing the reason

        throw Error('Error while Paginating Employees')
    }
}

exports.createEmployee = async function(empmst){

    // Creating a new Mongoose Object by using the new keyword

    var newEmployee = new EmpMstModel({
        name: empmst.name,
        designation: empmst.designation,
        basesalary: empmst.basesalary,
        deductions: empmst.deductions,
        takehomesalary: empmst.takehomesalary,
        status: empmst.status
    })




    try{

        // Saving the Employee

        var savedEmployee = await newEmployee.save()

        return savedEmployee;
    }catch(e){

        // return a Error message describing the reason

        throw Error("Error while Creating New Employee")
    }
}


exports.updateEmployee = async function(empmst){
    var id = empmst.id

    try{
        //Find the old Employee Object by the Id

        var oldEmployee = await EmpMstModel.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Employee")
    }

    // If no old Employee Object exists return false

    if(!oldEmployee){
        return false;
    }

    console.log(oldEmployee)

    //Edit the Employee Object

    oldEmployee.name = empmst.name,
    oldEmployee.designation = empmst.designation,
    oldEmployee.basesalary = empmst.basesalary,
    oldEmployee.deductions = empmst.deductions,
    oldEmployee.takehomesalary = empmst.takehomesalary,
    oldEmployee.status = empmst.status


    console.log(oldEmployee)

    try{
        var savedEmployee = await oldEmployee.save()
        return savedEmployee;
    }catch(e){
        throw Error("And Error occured while updating the employee");
    }
}

exports.deleteEmployee = async function(id){

    // Delete the Employee

    try{
        var deleted = await EmpMstModel.remove({_id: id})
        if(deleted.n === 0){
            throw Error("Employee Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Employee")
    }
}


exports.deleteEmployee = async function(id){

    // Delete the Employee

    try{
        var deleted = await EmpMstModel.remove({_id: id})
        if(deleted.n === 0){
            throw Error("Employee Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Employee")
    }
}

exports.removeDeductions = async function(id){

    // Delete the Employee
    try{
        var find = await DeductionsModel.findById(id);
        var deleted = await DeductionsModel.remove({_id: id})
        if(deleted.n === 0){
            throw Error("Deduction Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Deduction")
    }
}