var express = require('express')

var router = express.Router()

// Getting the Todo Controller that we just created

var EmployeeController = require('../../controllers/employee.controller');


// Map each API to the Controller FUnctions

router.get('/', EmployeeController.getEmployees)

router.post('/', EmployeeController.createEmployee)

router.put('/', EmployeeController.updateEmployee)

router.delete('/:id',EmployeeController.removeEmployee)

router.post('/deduction',EmployeeController.createDeductions)

// Export the Router

module.exports = router;