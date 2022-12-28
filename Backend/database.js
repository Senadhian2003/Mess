const mysql = require('mysql2');

module.exports = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Sena@2003',
    database : 'stock'
});