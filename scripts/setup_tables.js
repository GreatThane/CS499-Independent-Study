const path = require('path')
const envPath = path.resolve(process.cwd(), '.env.local')
require('dotenv').config({path: envPath})
const {query} = require('../lib/db')
const fs = require('fs').promises;

(async function () {
    const sql = await fs.readFile('./scripts/setup_tables.sql', 'utf-8');
    return await query(sql);
})()
    .then(r => console.log(r))
    .catch(e => console.error(e))
    .finally(() => process.exit())

