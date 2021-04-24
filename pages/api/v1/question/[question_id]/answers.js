const fs = require('fs').promises;
import {query} from "../../../../../lib/db";
let GET_ANSWERS_SQL;

export default async function handler(req, res) {
    if (!GET_ANSWERS_SQL) GET_ANSWERS_SQL = await fs.readFile('src/sql_scripts/get_answers.sql', 'utf-8');
    const {question_id} = req.query;

    res.status(200).json(await query(GET_ANSWERS_SQL, [question_id]));
}
