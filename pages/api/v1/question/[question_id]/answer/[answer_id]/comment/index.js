const fs = require('fs').promises;
import {query} from "../../../../../../../../lib/db";
let MAKE_COMMENT_SQL;

export default async function handler(req, res) {
    if (!MAKE_COMMENT_SQL) MAKE_COMMENT_SQL = await fs.readFile('src/sql_scripts/make_comment.sql', 'utf-8');

    if (req.method === "POST") {

        if (!req.body.content) {
            res.status(400).json({status: "Error: 'content' parameter required."});
        } else if (!req.body.author) {
            res.status(400).json({status: "Error: 'author' parameter required."});
        } else res.status(200).json(await query(MAKE_COMMENT_SQL, [req.body.content, req.body.author, req.query.answer_id]));

    } else res.status(405).json({status: "Error: Must be a post request."});
}
