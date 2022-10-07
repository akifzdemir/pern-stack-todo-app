CREATE DATABASE authtodo;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(25) NOT NULL
);

CREATE TABLE todos(
  todo_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  description VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);


ALTER TABLE users ALTER COLUMN password TYPE VARCHAR (255);
