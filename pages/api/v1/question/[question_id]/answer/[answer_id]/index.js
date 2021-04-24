const fs = require('fs').promises;
import {query} from "../../../../../../../lib/db";
let GET_POST_SQL;

export default async function handler(req, res) {
    if (!GET_POST_SQL) GET_POST_SQL = await fs.readFile('src/sql_scripts/get_post.sql', 'utf-8');
    const {answer_id} = req.query;
    let data = await query(GET_POST_SQL, [answer_id]);
    if (data.length === 0) {
        res.status(404).json({status: "This answer does not exist."});
    } else if (data[0].question_id === null) {
        res.status(406).json({status: "This ID corresponds with a question, not an answer."})
    } else {
        delete data[0].question_id;
        res.status(200).json(data[0]);
    }
}
