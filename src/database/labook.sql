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

CREATE TABLE
    posts (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes BOOLEAN,
        dislikes BOOLEAN,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users(id)
    );

    INSERT INTO posts (id, creator_id, content, likes, dislikes) 
VALUES
    ("p001", "u001", "Como é bom quando entendemos a matéria.", true, false),
    ("p002", "u002", "Estou com vontade de comer cachorro-quente com mel.", false, true),
    ("p003", "u003", "As minhas aulas começam segunda-feira.", true, false);

SELECT * FROM posts;

DROP TABLE posts;




