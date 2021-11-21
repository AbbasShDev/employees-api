const express = require("express");
const employeesRoutes = require("./routes/employees");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/employees", employeesRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
