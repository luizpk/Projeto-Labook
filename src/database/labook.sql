-- Active: 1675864873918@@127.0.0.1@3306

CREATE TABLE users (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
	name TEXT NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL,
    role ENUM NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL

);

INSERT INTO users (id, name, email, password,role)
VALUES 
("u001", "Luiz Paulo", "luizpaulo@mail.com", "123456L*","Admin"),
("u002", "Thalita Cepa", "thalitacepa@mail.com", "123456L*","USER"),
("u003", "Luiz Paulo Cepa", "luizpaulocepa@mail.com", "123456L*","USER");


SELECT * FROM users;

PRAGMA table_info('users');

DROP TABLE users;


