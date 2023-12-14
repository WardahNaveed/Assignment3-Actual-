var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
var employeeSchema = mongoose.Schema({
  title: String,
  details : String,
  salary:Number
});
var employee = mongoose.model("employee", employeeSchema);

function validateemployee(data) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(10).required(),
    details: Joi.string().min(3).max(10).required(),
    salary: Joi.number().min(0).required(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.employee = employee;
module.exports.validate = validateemployee;
