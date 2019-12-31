var router = require('express').Router();
var mysql = require('mysql');
var pgsql = require('pg');
require('dotenv').config();

var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
});

const { Client } = require('pg');
const client = new Client( {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    database: process.env.PG_NAME,
    password: process.env.PG_PW,
    port: 5432
});

client.connect();

// client.query('SELECT * FROM watching_subjects', (err, res) => {
//     for(var i = 0; i < res.rows.length; i ++) {
//         console.log(res.rows[i].subject_name);
//     }
//     client.end();
// });


router.get('/topic/add', (req, res) => {
    var sql = 'SELECT * FROM topic';
    db.query(sql, (err, result) => {
        //쿼리 결과를 콜백 함수로 받는다.
        if(!err) {
            console.log(`총 ${result.length}개의 책이 조회됨.`);
            res.render('add', {
                dataArray : result
            });
        } else {
            console.log(err);
        }
    });
});

router.post('/topic/insert', (req, res) => {

    var sql = 'INSERT INTO topic(title, description, author) VALUES (?, ?, ?)';
    var params = [req.body.title, req.body.description, req.body.author];
    //`INSERT INTO topic(title, description, author) VALUES ('${req.body.title}','${req.body.description}','${req.body.author}')`;
    var sql = 
    db.query(sql, params, (err, result) => {
        if(!err) {

            res.redirect('/topic/add');


            // var sql2 = 'SELECT * FROM topic';
            // db.query(sql2, (err, result) => {
            //     console.log(`총 ${result.length}개의 책이 조회됨.`);
            //     res.render('add', {
            //         dataArray : result
            //     })
            // });
        } else {
            console.log(err);
        }
    });
});

//콜론을 붙여주면 그것을 parameter로 해석한다
router.get('/topic/:id', (req, res) => {
    var id = req.params.id
    var sql = `SELECT * FROM topic WHERE id=?`;
    db.query(sql, [id], (err, result) => {
        if(!err) {
            console.log(result);
            res.render('test', {topic: result});
        } else {
            console.log(err);
        }
    });
})


module.exports = router;