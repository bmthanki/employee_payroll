var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

Schema = mongoose.Schema

var DeductionsSchema = Schema({
    deduction: String,
    amount: Number,
})

var EmpMstSchema = Schema({
    name: String,
    designation: String,
    basesalary: Number,
    tax: Number,
    deductions: [DeductionsSchema],
    takehomesalary: Number,
    date: { type: Date, default: Date.now },
})



EmpMstSchema.plugin(mongoosePaginate)
const EmpMst = mongoose.model('EmpMst', EmpMstSchema)
const Deductions = mongoose.model('Deductions', DeductionsSchema)

module.exports = EmpMst;