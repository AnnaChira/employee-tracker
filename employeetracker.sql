DROP DATABASE IF EXISTS employee_tracker:
CREATE database employee_tracker;

USE employee_tracker;

CREATE TABLE employees  (
  id INT AUTO_INCREMENT,
  position INT NOT NULL,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,  
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT AUTO_INCREMENT,
  position INT NOT NULL,
  title VARCHAR(30) NULL,
  salary DECIMAL,
  department_id INT NULL,  
  PRIMARY KEY (id)
);

CREATE TABLE departments (
  id INT AUTO_INCREMENT,
  position INT NOT NULL,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

SELECT * FROM employee;
SELECT * FROM roles;
SELECT * FROM departments;