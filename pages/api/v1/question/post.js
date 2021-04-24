const fs = require('fs').promises;
import {query} from "../../../../lib/db";

let MAKE_POST_SQL;

export default async function handler(req, res) {
    if (!MAKE_POST_SQL) MAKE_POST_SQL = await fs.readFile('src/sql_scripts/make_post.sql', 'utf-8');

    if (req.method === "POST") {

        if (!req.body.content) {
            res.status(400).json({status: "Error: 'content' parameter required."});
        } else if (!req.body.author) {
            res.status(400).json({status: "Error: 'author' parameter required."});
        } else if (!req.body.title) {
            res.status(400).json({status: "Error: 'title' parameter required."});
        } else {
            let q = (await query(MAKE_POST_SQL, [req.body.title, req.body.content, req.body.author, null]))[1][0];
            delete q.question_id;
            res.status(200).json(q);
        }

    } else res.status(405).json({status: "Error: Must be a post request."});
}
