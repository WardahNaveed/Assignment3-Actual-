const express = require("express");
let router = express.Router();
const validateemployee = require("../../middlewares/validateemployee");
const { employee } = require("../../models/employee");
//get employees
router.get("/", async (req, res) => {
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let employees = await employee.find().skip(skipRecords).limit(perPage);
  return res.send(employees);
});
//get single employees
router.get("/:id", async (req, res) => {
  try {
    let employees= await employee.findById(req.params.id);
    if (!employee)
      return res.status(400).send("employee With given ID is not present"); //when id is not present id db
    return res.send(employees); //everything is ok
  } catch (err) {
    return res.status(400).send("Invalid ID"); // format of id is not correct
  }
});
//update a record
router.put("/:id", validateemployee, async (req, res) => {
  let employees = await employee.findById(req.params.id);
  employee.name = req.body.name;
  employee.price = req.body.price;
  await employee.save();
  return res.send(employees);
});
//update a record
router.delete("/:id", async (req, res) => {
  let employees = await employee.findByIdAndDelete(req.params.id);
  return res.send(employees);
});
//Insert a record
// Insert a record
router.post("/", validateemployee, async (req, res) => {
  let newEmployee = new employee();
  newEmployee.title = req.body.title;
  newEmployee.details = req.body.details;
  newEmployee.salary = req.body.salary;
  await newEmployee.save();
  return res.send(newEmployee);
});

module.exports = router;
