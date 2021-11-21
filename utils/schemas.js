const yup = require("yup");

const createEmployeeSchema = yup.object({
  body: yup.object({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    date_of_birth: yup.date().required(),
    gender: yup.mixed().oneOf(["male", "female"]).required(),
    salary: yup.number().required(),
    status: yup.mixed().oneOf(["InActive", "Active"]).required(),
  }),
});

const updateEmployeeSchema = yup.object({
  body: yup.object({
    first_name: yup.string(),
    last_name: yup.string(),
    date_of_birth: yup.date(),
    gender: yup.mixed().oneOf(["male", "female"]),
    salary: yup.number(),
    status: yup.mixed().oneOf(["InActive", "Active"]),
  }),
  params: yup.object({
    id: yup.string().required(),
  }),
});

const updateEmployeeStatusSchema = yup.object({
  body: yup.object({
    status: yup.mixed().oneOf(["InActive", "Active"]).required(),
  }),
  params: yup.object({
    id: yup.string().required(),
  }),
});

module.exports = {
  createEmployeeSchema,
  updateEmployeeSchema,
  updateEmployeeStatusSchema,
};
