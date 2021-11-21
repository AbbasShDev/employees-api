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

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       allOf:
 *         - type: object
 *           properties:
 *              id:
 *                  type: string
 *                  example: fn4o3-rjnjk-njk4-njk4
 *                  description: The employee ID.
 *              first_name:
 *                  type: string
 *                  description: The first name of the employee.
 *                  example: Ali
 *              last_name:
 *                  type: string
 *                  description: The last name of the employee.
 *                  example: Alali
 *              date_of_birth:
 *                  type: date
 *                  description: The date of birth of the employee.
 *                  example: 5/29/1995
 *              gender:
 *                  type: string
 *                  description: The gender of the employee.
 *                  example: male
 *              salary:
 *                  type: decimal
 *                  description: The salary of the employee.
 *                  example: 6000
 *              status:
 *                  type: string
 *                  description: The status of the employee.
 *                  example: InActive
 */

/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Create new employee.
 *     description: Create new employee.
 *     parameters:
 *       - in: body
 *         name: first_name
 *         required: true
 *         description: The first name of the employee.
 *         schema:
 *           type: string
 *       - in: body
 *         name: last_name
 *         required: true
 *         description: The last name of the employee.
 *         schema:
 *           type: string
 *       - in: body
 *         name: date_of_birth
 *         required: true
 *         description: The date of birth of the employee.
 *         schema:
 *           type: date
 *       - in: body
 *         name: gender
 *         required: true
 *         description: The gender of the employee.
 *         schema:
 *           type: string
 *       - in: body
 *         name: salary
 *         required: true
 *         description: The salary of the employee.
 *         schema:
 *           type: decimal
 *       - in: body
 *         name: status
 *         required: true
 *         description: The status of the employee.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The new employee.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *                      description: The message .
 *                      example: Employee added successfully
 *                  data:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Employee'
 */
router.post("/", schemaValidate(createEmployeeSchema), createEmployees);

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Retrieve a list of the employees.
 *     description: Retrieve a list of the employees.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 */
router.get("/", getEmployees);

/**
 * @swagger
 * /api/employees/{id}:
 *   patch:
 *     summary: Update an eemployees' data.
 *     description: Update an employees' data.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The employee ID.
 *         schema:
 *           type: string
 *       - in: body
 *         name: first_name
 *         required: false
 *         description: The first name of the employee.
 *         schema:
 *           type: string
 *       - in: body
 *         name: last_name
 *         required: false
 *         description: The last name of the employee.
 *         schema:
 *           type: string
 *       - in: body
 *         name: date_of_birth
 *         required: false
 *         description: The date of birth of the employee.
 *         schema:
 *           type: date
 *       - in: body
 *         name: gender
 *         required: false
 *         description: The gender of the employee.
 *         schema:
 *           type: string
 *       - in: body
 *         name: salary
 *         required: false
 *         description: The salary of the employee.
 *         schema:
 *           type: decimal
 *       - in: body
 *         name: status
 *         required: false
 *         description: The status of the employee.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The new employee.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *                      description: The message .
 *                      example: Employee updated successfully
 *                  data:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Employee'
 */
router.patch("/:id", schemaValidate(updateEmployeeSchema), updateEmployee);

/**
 * @swagger
 * /api/employees/{id}/status:
 *   patch:
 *     summary: Update employees' status.
 *     description: Update an employees' status.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The employee ID.
 *         schema:
 *           type: string
 *       - in: body
 *         name: status
 *         required: false
 *         description: The status of the employee.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The new employee.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *                      description: The message .
 *                      example: Status changed successfully
 *                  data:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Employee'
 */
router.patch(
  "/:id/status",
  schemaValidate(updateEmployeeStatusSchema),
  updateEmployeeStatus
);

/**
 * @swagger
 * /api/employees/search?q={seaechQuery}:
 *   get:
 *     summary: Search in employees by first or last name.
 *     description: Search in employees by first or last name.
 *     parameters:
 *       - in: path
 *         name: q
 *         required: true
 *         description: The query to search by employees' name.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 */
router.get("/search", searchEmployees);

module.exports = router;
