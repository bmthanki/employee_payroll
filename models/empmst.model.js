var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var EmpMstSchema = new mongoose.Schema({
    name: String,
    designation: String,
    basesalary: Number,
    deductions: Number,
    takehomesalary: Number,
    date: { type: Date, default: Date.now },
    status: String
})

EmpMstSchema.plugin(mongoosePaginate)
const EmpMst = mongoose.model('EmpMst', EmpMstSchema)

module.exports = EmpMst;