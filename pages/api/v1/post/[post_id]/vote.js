const fs = require('fs').promises;
import {query} from "../../../../../lib/db";

let VOTE_POST_SQL;

export async function upvote(post_id, vote, author) {
    if (!VOTE_POST_SQL) VOTE_POST_SQL = await fs.readFile('src/sql_scripts/vote_post.sql', 'utf-8');
    return await query(VOTE_POST_SQL, [post_id, author, vote]);
}

export default async function handler(req, res) {
    if (req.method === "POST") {

        if (!req.body.author) {
            res.status(400).json({status: "Error: 'author' parameter required."})
        } else if (req.body.vote === undefined || req.body.vote === null) {
            res.status(400).json({status: "Error: 'vote' parameter required."})
        } else res.status(200).json(await upvote(req.query.post_id, req.body.vote, req.body.author));

    } else res.status(405).json({status: "Error: Must be a post request."})
}
