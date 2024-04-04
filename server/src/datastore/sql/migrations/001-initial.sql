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

CREATE TABLE comments (
  id      VARCHAR NOT NULL PRIMARY KEY,
  userId  VARCHAR NOT NULL,
  postId  VARCHAR NOT NULL,
  comment VARCHAR NOT NULL,
  postedAt INTEGER NOT NULL,
  FOREIGN KEY (userId) REFERENCES users (id),
  FOREIGN KEY (PostId) REFERENCES posts (id)
);

CREATE TABLE likes (
  userId  VARCHAR NOT NULL,
  postId  VARCHAR NOT NULL,
  FOREIGN KEY (userId) REFERENCES users (id),
  FOREIGN KEY (postId) REFERENCES posts (id),
  PRIMARY KEY (userId, postId)
);