const fs = require('fs').promises;
import {query} from "../../../lib/db";

let SEARCH_FOR_SQL;

export async function searchFor(needle, limit = 10) {
    if (!SEARCH_FOR_SQL) SEARCH_FOR_SQL = await fs.readFile('src/sql_scripts/search_for.sql', 'utf-8');
    return JSON.parse(JSON.stringify((await query(SEARCH_FOR_SQL, [needle, limit]))[1]));
}

export default async function handler(req, res) {
    if (!req.query.needle) {
        res.status(400).json({status: "Error: 'needle' parameter required."});
    } else res.status(200).json(await searchFor(req.query.needle, parseInt(req.query.limit || "10")));
}
