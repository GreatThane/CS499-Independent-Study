const fs = require('fs').promises;
import {query} from "../../../../../lib/db";
let GET_COMMENTS_SQL;

export default async function handler(req, res) {
    if (!GET_COMMENTS_SQL) GET_COMMENTS_SQL = await fs.readFile('src/sql_scripts/get_comments.sql', 'utf-8');
    const {question_id} = req.query;

    res.status(200).json(await query(GET_COMMENTS_SQL, [question_id]));
}

