SELECT p.id, p.title, p.content, p.time_stamp, p.author, p.question_id, COALESCE(SUM(v.value), 0) AS votes
FROM Posts p LEFT JOIN Votes v ON p.id = v.post_id
WHERE p.id = ?
GROUP BY p.id;
