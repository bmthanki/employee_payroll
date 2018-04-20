var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var EmpMstSchema = new mongoose.Schema({
    name: String,
    designation: String,
    basesalary: mongoose.Schema.Types.Decimal,
    deductions: mongoose.Schema.Types.Decimal,
    takehomesalary: mongoose.Schema.Types.Decimal,
    date: { type: Date, default: Date.now },
    status: String
})

EmpMstSchema.plugin(mongoosePaginate)
const EmpMst = mongoose.model('EmpMst', EmpMstSchema)

module.exports = EmpMst;