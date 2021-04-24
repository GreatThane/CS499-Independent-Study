const mysql = require('serverless-mysql');

const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        port: parseInt(process.env.MYSQL_PORT),
        multipleStatements: true
    },
})
module.exports.db = db;

async function query(q, values = []) {
    try {
        const results = await db.query(q, values)
        await db.end()
        return results
    } catch (e) {
        throw Error(e.message)
    }
}
module.exports.query = query;
