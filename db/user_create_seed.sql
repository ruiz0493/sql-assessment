-- It may be helpful to drop and reinstantilize the table when doing
-- the tests in case you delete users/cars the tests are expecting to see
-- DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    id serial primary key,
    firstname varchar(40),
    lastname varchar(40),
    email varchar(50)
);

INSERT INTO Users
(firstname, lastname, email)
VALUES
('John', 'Smith', 'John@Smith.com'),
('Dave', 'Davis', 'Dave@Davis.com'),
('Jane', 'Janis', 'Jane@Janis.com');


-- Create a table called Users that has an id, firstname, lastname, and an email

-- Insert 3 records into Users: