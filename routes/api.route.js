var express = require('express')

var router = express.Router()
var employees = require('./api/employees.route')


router.use('/employees', employees);


module.exports = router;