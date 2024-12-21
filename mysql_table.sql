CREATE DATABASE mysql_table;

USE mysql_table;

CREATE TABLE IF NOT EXISTS userdata (
	id INT AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(255),
	last_name VARCHAR(255),
	age INT,
	email VARCHAR(255),
	phone VARCHAR(20),
	eircode VARCHAR(6),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO userdata (first_name, last_name, age, email, phone, eircode)
VALUES 
('Alexandre', 'Casaroes', 30, '2024672@student.cct.ie', '0000000000', 'D07A0E1');

SHOW DATABASES;

SELECT * FROM userdata;


