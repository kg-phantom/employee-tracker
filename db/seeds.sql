INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Finance'),
    ('Engineering'),
    ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Salesperson', 80000, 1),
    ('Sales Lead', 100000, 1),
    ('Accountant', 125000, 2),
    ('Software Engineer', 120000, 3),
    ('Lead Engineer', 150000, 3),
    ('Lawyer', 190000, 4),
    ('Legal Team Lead', 250000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
    ('John', 'Doe', 2),
    ('Mike', 'Chan', 1),
    ('Ashley', 'Rodriguez', 5);

UPDATE employee
SET manager_id = 3
WHERE id = 1;

UPDATE employee
SET manager_id = 1
WHERE id = 2;