const mysql = require ('mysql');
const util = require ('util');

const pool = mysql.createPool ({
    host: process.env.HOST_DB,
    port: process.env.PORT_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE,
    connectionLimit: 10,
})

pool.query = util.promisify(pool.query);

module.exports = pool;