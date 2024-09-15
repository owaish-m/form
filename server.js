const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); 


app.use(express.static(path.join(__dirname, 'public')));


const db = mysql.createConnection({
    host: 'localhost',
    user: 'Owaish', //User Mysql wala Likhna hai
    password: '@Owaish31',//Mysql wala Password
    database: 'bgmi_registration'//database hai ye 
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});


app.post('/register', (req, res) => {
    const { username, email, password, ign, character_id, level, role } = req.body;

 
    const sql = 'INSERT INTO users (username, email, password, ign, character_id, level, role) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [username, email, password, ign, character_id, level, role], (err, result) => {
        if (err) {
            return res.send('Error: ' + err);
        }
        res.send('User registered successfully!');
    });
});

app.post('/signin', (req, res) => {
    const { email, password } = req.body;


    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            return res.status(500).send('Server error: ' + err);
        }

        if (results.length > 0) {
            res.send('Sign-in successful!'); 
        } else {
            res.status(401).send('Invalid email or password');
        }
    });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
