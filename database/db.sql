CREATE DATABASE users;


CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	username VARCHAR(40),
	password TEXT
)


CREATE TABLE datos(
	id SERIAL PRIMARY KEY,
	temp real,
	humedad real,
	agua real,
	suelo real,
	hora time, 
	fecha date
)

CREATE TABLE regado(
	id SERIAL PRIMARY KEY,
	hora time, 
	fecha date
)