const fs = require('fs').promises;
import {query} from "../../../../../../lib/db";
let GET_COMMENT_SQL;

export default async function handler(req, res) {
    if (!GET_COMMENT_SQL) GET_COMMENT_SQL = await fs.readFile('src/sql_scripts/get_comment.sql', 'utf-8');
    const {comment_id, question_id} = req.query;
    let data = await query(GET_COMMENT_SQL, [comment_id]);
    if (data.length === 0) {
        res.status(404).json({status: "This comment does not exist."});
    } else if (data[0].post_id !== question_id) {
        res.status(406).json({status: "This ID corresponds to a comment from a different post."})
    } else {
        delete data[0].post_id;
        res.status(200).json(data[0]);
    }
}
