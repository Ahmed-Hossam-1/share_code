CREATE TABLE users(
    id         VARCHAR PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name  VARCHAR NOT NULL,
    username   VARCHAR UNIQUE NOT NULL,
    password   VARCHAR NOT NULL,
    email      VARCHAR UNIQUE NOT NULL
);

CREATE TABLE posts (
    id          VARCHAR PRIMARY KEY,
    title       VARCHAR NOT NULL,
    url         VARCHAR UNIQUE NOT NULL,
    user_id     VARCHAR NOT NULL,
    postedAt    INTEGER NOT NULL
    FOREIGN KEY (user_id) REFERENCES users(id)
);
