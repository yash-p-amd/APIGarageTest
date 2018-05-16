const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_USERS = 'SELECT * FROM users';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'apidemo'
});

connection.connect(err => {
    if(err)
    {
        return err; 
    }
});


app.get('/', (req, res) => {
    res.send('go to /apidemo-users at Port 777')
});

app.get('/apidemo', (req, res) =>{
    connection.query(SELECT_ALL_USERS ,(err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            return res.json({
                data: results
            })
        }
    });
});

app.get('/apidemo/add', (req, res) => {
    const {firstname, lastname, email} = req.query;
    const INSERT_NEW_USERS = `INSERT INTO users (id, firstname, lastname, email) VALUES (NULL, '${firstname}', '${lastname}','${email}')`
    
    connection.query(INSERT_NEW_USERS, (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            return res.send('Added New User')
        }
    });
});

app.get('/apidemo/remove', (req, res) => {
    const {id} = req.query;
    const REMOVE_USER = `DELETE FROM users WHERE users.id = ${id}`
    
    connection.query(REMOVE_USER, (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            return res.send('Removed User')
        }
    });
});

app.listen(4000, () => {
    console.log('User Server Up & Listening on Port 4000')
});

