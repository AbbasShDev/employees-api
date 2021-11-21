const express = require("express");
const {
  createEmployees,
  getEmployees,
  updateEmployee,
  updateEmployeeStatus,
  searchEmployees,
} = require("../controllers/employees");
const { schemaValidate } = require("../middlewares/validate");
const {
  createEmployeeSchema,
  updateEmployeeSchema,
  updateEmployeeStatusSchema,
} = require("../utils/schemas");

const router = express.Router();

router.post("/", schemaValidate(createEmployeeSchema), createEmployees);
router.get("/", getEmployees);
router.patch("/:id", schemaValidate(updateEmployeeSchema), updateEmployee);
router.patch(
  "/:id/status",
  schemaValidate(updateEmployeeStatusSchema),
  updateEmployeeStatus
);
router.get("/search", searchEmployees);

module.exports = router;
