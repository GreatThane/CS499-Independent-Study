INSERT INTO Posts (title, content, author, question_id) VALUES (?, ?, ?, ?);
SELECT * FROM Posts WHERE id = LAST_INSERT_ID();
