CREATE DATABASE users;


CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	username VARCHAR(40),
	email TEXT
)

INSERT INTO users (username, email) VALUES ('STEVEN', 'steven@hotmail.com')