const mysql = require('mysql2');

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "fmt_test_database"
});

module.exports = db;