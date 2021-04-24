const fs = require('fs').promises;
import {query} from "../../../../../../../lib/db";

let VOTE_STATUS_SQL;

export async function getVoteStatus(post_id, user_id) {
    if (!VOTE_STATUS_SQL) VOTE_STATUS_SQL = await fs.readFile('src/sql_scripts/vote_status.sql', 'utf-8');
    return await query(VOTE_STATUS_SQL, [post_id, user_id]);
}

export default async function handler(req, res) {
    if (!req.query.author) {
        res.status(400).json({status: "Error: 'author' parameter required."})
    } else res.status(200).json(await getVoteStatus(req.query.answer_id, req.query.author));
}
