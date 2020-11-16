DROP DATABASE IF EXISTS employee_tracker:
CREATE database employee_tracker;

USE employee_tracker;

CREATE TABLE employee (
  position INT NOT NULL,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,  
  PRIMARY KEY (position)
);

CREATE TABLE roles (
  position INT NOT NULL,
  title VARCHAR(30) NULL,
  salary DECIMAL,
  department_id INT NULL,  
  PRIMARY KEY (position)
);

CREATE TABLE departments (
  position INT NOT NULL,
  name VARCHAR(30) NULL,
  PRIMARY KEY (position)
);

SELECT * FROM employee;
SELECT * FROM roles;
SELECT * FROM departments;