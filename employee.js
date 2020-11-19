require('dotenv').config()
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",
  password: process.env.DB_PASSWORD,
  database: "employee_tracker"
});

connection.connect(function (err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Find the employee",
        "Find all the employee by department",
        "Find all the employees by manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee's Role",
        "Update Employee's Manager",
        "View all Employees",
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Find the employee":
          employeeSearch();
          break;

        case "View all Employees":
          viewallSearch();
          break;

        case "Find all the employee by department":
          departmentSearch();
          break;

        case "Find all the employees by manager":
          managerSearch();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Remove Employee":
          deleteEmployee();
          break;

        case "Update Employee's Role":
          updateEmployeeR();
          break;

        case "Update Employee's Manager":
          updateEmployeeM();
          break;
      }
    });
}

function viewallSearch() {
  var query = "SELECT * FROM employees";
  connection.query(query, function (err, res) {
    console.log(err);
    console.table(res);
    runSearch();
  })
};

function employeeSearch() {
  inquirer.prompt([
    {

    }
  ])
}

function addEmployee() {
  inquirer.prompt([
    {
      name: "first",
      type: "input",
      message: "What is the employee's first name?"
    },
    {
      name: "last",
      type: "input",
      message: "What is the employee's last name?"
    },
    {
      name: "role",
      type: "list",
      message: "What is the employee's role?",
      choices: ["Manager", "Engineer", "IT Support", "HR Support"]
    },
  ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employees",
        {
          first_name: answer.first,
          last_name: answer.last,
          role_id: answer.role,
        },
        function (err) {
          if (err) throw err;
          runSearch();
        }
      );
    });

}


