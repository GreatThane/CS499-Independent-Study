const fs = require('fs').promises;
import {query} from "../../../../../lib/db";
let GET_POST_SQL, GET_ANSWERS_SQL, GET_COMMENTS_SQL;

export async function retrieveQuestion(question_id, expanded = false) {
    if (!GET_POST_SQL) GET_POST_SQL = await fs.readFile('src/sql_scripts/get_post.sql', 'utf-8');
    const data = (await query(GET_POST_SQL, [question_id]));
    if (data.length === 0) {
        throw {
            message: "This question does not exist.",
            status: 404
        }
    } else if (data[0].question_id !== null) {
        throw {
            message: "This ID corresponds with an answer, not a question.",
            status: 406
        }
    } else {
        delete data[0].question_id;
        const ret = data[0];
        console.log(ret);
        if (expanded) {
            if (!GET_ANSWERS_SQL) GET_ANSWERS_SQL = await fs.readFile('src/sql_scripts/get_answers.sql', 'utf-8');
            if (!GET_COMMENTS_SQL) GET_COMMENTS_SQL = await fs.readFile('src/sql_scripts/get_comments.sql', 'utf-8');


            ret.comments = await query(GET_COMMENTS_SQL, [question_id]);
            ret.answers = await query(GET_ANSWERS_SQL, [question_id]);

            for (let answer of ret.answers) {
                delete answer.question_id;
                delete answer.title;
                answer.comments = await query(GET_COMMENTS_SQL, [answer.id]);
            }
        }
        return JSON.parse(JSON.stringify(ret));
    }
}

export default async function handler(req, res) {
    try {
        res.status(200).json(await retrieveQuestion(req.query.question_id, req.query.hasOwnProperty('expanded')));
    } catch (e) {
        res.status(e.status).json(e);
    }
}
