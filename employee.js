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

connection.connect(function(err) {
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
    .then(function(answer) {
      switch (answer.action) {
      case "Find the employee":
        employeeSearch();
        break;

      case "View all Employees":
        viewallSearch();
        break;

      case  "Find all the employee by department":
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

      case  "Update Employee's Role":
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
  connection.query(query, function(err, res){
    console.log(err);
    console.table(res);
    runSearch();
  })
};

function addEmployee () {
  .prompt([
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
  .then(function(answer) {
    connection.query("Insert Into Employee")
  })
}

function employeeSearch() {
  inquirer
    .prompt({
      name: "employee",
      type: "input",
      message: "What employee would you like to search for?"
    })
    .then(function(answer) {
      var query = "SELECT FROM employee WHERE ?";
      connection.query(query, { employee: answer.firstname }, function(err, res) {
        for (var i = 0; i < res.length; i++) 
        runSearch();
      });
    });
}

function multiSearch() {
  var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].artist);
    }
    runSearch();
  });
}

function rangeSearch() {
  inquirer
    .prompt([
      {
        name: "start",
        type: "input",
        message: "Enter starting position: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "end",
        type: "input",
        message: "Enter ending position: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
      connection.query(query, [answer.start, answer.end], function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(
            "Position: " +
              res[i].position +
              " || Song: " +
              res[i].song +
              " || Artist: " +
              res[i].artist +
              " || Year: " +
              res[i].year
          );
        }
        runSearch();
      });
    });
}

function songSearch() {
  inquirer
    .prompt({
      name: "song",
      type: "input",
      message: "What song would you like to look for?"
    })
    .then(function(answer) {
      console.log(answer.song);
      connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
        console.log(
          "Position: " +
            res[0].position +
            " || Song: " +
            res[0].song +
            " || Artist: " +
            res[0].artist +
            " || Year: " +
            res[0].year
        );
        runSearch();
      });
    });
}

function songAndAlbumSearch() {
  inquirer
    .prompt({
      name: "artist",
      type: "input",
      message: "What artist would you like to search for?"
    })
    .then(function(answer) {
      var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
      query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
      query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";

      connection.query(query, [answer.artist, answer.artist], function(err, res) {
        console.log(res.length + " matches found!");
        for (var i = 0; i < res.length; i++) {
          console.log(
            i+1 + ".) " +
              "Year: " +
              res[i].year +
              " Album Position: " +
              res[i].position +
              " || Artist: " +
              res[i].artist +
              " || Song: " +
              res[i].song +
              " || Album: " +
              res[i].album
          );
        }

        runSearch();
      });
    });
}
