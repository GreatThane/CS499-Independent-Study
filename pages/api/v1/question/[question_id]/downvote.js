const fs = require('fs').promises;
import {query} from "../../../../../lib/db";

let VOTE_POST_SQL;

export async function downvote(question_id, author) {
    if (!VOTE_POST_SQL) VOTE_POST_SQL = await fs.readFile('src/sql_scripts/vote_post.sql', 'utf-8');
    return await query(VOTE_POST_SQL, [question_id, author, -1]);
}

export default async function handler(req, res) {
    if (req.method === "POST") {

        if (!req.body.author) {
            res.status(400).json({status: "Error: 'author' parameter required."})
        } else res.status(200).json(await downvote(req.query.question_id, req.body.author));

    } else res.status(405).json({status: "Error: Must be a post request."})
}
