const  mysql2 = require("mysql2");

const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    database: "numerical_method",
    password: "12345678"
})

module.exports = db