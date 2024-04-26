CREATE TABLE likeComments (
  userId  VARCHAR NOT NULL,
  commentId  VARCHAR NOT NULL,
  FOREIGN KEY (userId) REFERENCES users (id),
  FOREIGN KEY (commentId) REFERENCES comments (id),
  PRIMARY KEY (userId, commentId)
);