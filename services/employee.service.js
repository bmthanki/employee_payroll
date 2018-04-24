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

    var taxamount = empmst.basesalary*(0.1)
    var takehomesalary = empmst.basesalary - taxamount
    var newEmployee = new EmpMstModel({
        name: empmst.name,
        designation: empmst.designation,
        basesalary: empmst.basesalary,
        taxamount:taxamount,
        deductiontotal:0,
        takehomesalary: takehomesalary,
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
    //temp data
    var taxamount = empmst.basesalary*(0.1)
    var deductiontotal =0
    for (let i = 0; i < empmst.deductions.length; i++) {
        deductiontotal = Number(deductiontotal) + Number(empmst.deductions[i].amount)
    }
    var takehomesalary = (+empmst.basesalary) - (+taxamount - +deductiontotal)
    console.log(oldEmployee)
    //Edit the Employee Object
    oldEmployee.name = empmst.name,
    oldEmployee.designation = empmst.designation,
    oldEmployee.basesalary = empmst.basesalary,
    oldEmployee.taxamount = taxamount,
    oldEmployee.deductiontotal = deductiontotal,
    oldEmployee.deductions = empmst.deductions,
    oldEmployee.takehomesalary = takehomesalary

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

