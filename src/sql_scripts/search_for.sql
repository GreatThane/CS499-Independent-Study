SET @SearchTerm = LOWER(CONCAT('%', ?, '%'));
SELECT p.id, p.title, p.content, p.time_stamp, p.author, COALESCE(SUM(v.value), 0) AS votes
FROM Posts p LEFT JOIN Votes v ON p.id = v.post_id
WHERE p.question_id IS NULL
  AND (LOWER(p.content) LIKE @SearchTerm
    OR LOWER(p.title) LIKE @SearchTerm)
GROUP BY p.id
ORDER BY votes DESC
LIMIT ?;
