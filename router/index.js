var router = require('express').Router();
var mysql = require('mysql');
require('dotenv').config();

var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
});






router.get('/', (req, res) => {

});


module.exports = router;