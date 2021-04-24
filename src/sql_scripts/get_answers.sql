SELECT p.id, p.title, p.content, p.time_stamp, p.author, COALESCE(SUM(v.value), 0) AS votes
FROM Posts p LEFT JOIN Votes v ON p.id = v.post_id
WHERE p.question_id = ?
GROUP BY p.id;
