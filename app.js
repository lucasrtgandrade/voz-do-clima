const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 4000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
});

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect((err) => {
    if (err) return console.error(err.message);

    const createCadastrosTable = `CREATE TABLE IF NOT EXISTS cadastros (
                                        cadastro_id INT NOT NULL AUTO_INCREMENT,
                                        nome VARCHAR(100) NOT NULL,
                                        sobrenome VARCHAR(100) NOT NULL,
                                        email VARCHAR(100) NOT NULL UNIQUE,
                                        senha VARCHAR(255) NOT NULL,
                                        PRIMARY KEY (cadastro_id)
                                        )`;

    connection.query(createCadastrosTable, (err, results, fields) => {
        if (err) return console.log(err.message);
    });
});

const cadastroRoute = require('./routes/api/cadastro')(connection);
app.use('/api/cadastro', cadastroRoute);
app.get('/', (req, res) => {
    res.send('hello world');
});

