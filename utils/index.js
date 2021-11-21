const fs = require("fs");

const saveEmployees = (employees) => {
  const dataJSON = JSON.stringify(employees);

  fs.writeFileSync("employees.json", dataJSON);
};

const loadEmployees = () => {
  try {
    const dataBuffer = fs.readFileSync("employees.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

const getCurrentDatetime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  return date + " " + time;
};

module.exports = {
  saveEmployees,
  loadEmployees,
  getCurrentDatetime,
};
