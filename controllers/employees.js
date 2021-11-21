const { uuid } = require("uuidv4");
const {
  loadEmployees,
  saveEmployees,
  getCurrentDatetime,
} = require("../utils");

const createEmployees = (req, res) => {
  try {
    const { first_name, last_name, date_of_birth, gender, salary, status } =
      req.body;
    const employees = loadEmployees();

    const newEmployee = {
      ID: uuid(),
      first_name,
      last_name,
      date_of_birth,
      gender,
      salary,
      created_at: getCurrentDatetime(),
      status,
    };

    employees.push(newEmployee);

    saveEmployees(employees);

    res
      .status(201)
      .json({ message: "Employee added successfully", data: newEmployee });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

const getEmployees = (req, res) => {
  try {
    const employees = loadEmployees();

    res.status(200).json({ data: employees });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

const updateEmployee = (req, res) => {
  try {
    const { first_name, last_name, date_of_birth, gender, salary, status } =
      req.body;

    const ID = req.params.id;

    const employees = loadEmployees();

    const index = employees.findIndex((employee) => employee.ID === ID);

    employees[index].first_name = first_name || employees[index].first_name;
    employees[index].last_name = last_name || employees[index].last_name;
    employees[index].date_of_birth =
      date_of_birth || employees[index].date_of_birth;
    employees[index].gender = gender || employees[index].gender;
    employees[index].salary = salary || employees[index].salary;
    employees[index].status = status || employees[index].status;

    saveEmployees(employees);

    res.status(200).json({
      message: "Employee updated successfully",
      data: employees[index],
    });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

const updateEmployeeStatus = (req, res) => {
  const { status } = req.body;

  try {
    if (status !== "Active" && status !== "InActive")
      return res.status(400).json({ message: "Bad request" });

    const ID = req.params.id;

    const employees = loadEmployees();

    const index = employees.findIndex((employee) => employee.ID === ID);

    employees[index].status =
      employees[index].status === "Active" ? "InActive" : "Active";

    saveEmployees(employees);

    res
      .status(200)
      .json({ message: "Status changed successfully", data: employees[index] });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

const searchEmployees = (req, res) => {
  const { q } = req.query;

  try {
    if (!q || q.length <= 0)
      return res.status(400).json({ message: "Bad request" });

    const employees = loadEmployees();

    const searchedEmployees = employees.filter(
      (employee) =>
        employee.first_name.toLowerCase().includes(q.toLowerCase()) ||
        employee.last_name.toLowerCase().includes(q.toLowerCase())
    );

    res.status(200).json({ data: searchedEmployees });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

module.exports = {
  createEmployees,
  getEmployees,
  updateEmployee,
  updateEmployeeStatus,
  searchEmployees,
};
