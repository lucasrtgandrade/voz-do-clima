// Importar dependências
const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require("path");
const axios = require('axios');


// Configuração do aplicativo
const app = express();
const port = 4000;
const apiKey = 'b78417d81e56fd398f7e70c85b632a7f';

// Configurar EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configuração do Middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(session({
    secret: '159863',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false},
}))

// Conexão MySQL
let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Query para criar tabela cadastro
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

    connection.query(createCadastrosTable, (err) => {
        if (err) return console.log(err.message);
    });
});

// Routes
app.get('/', (req, res) => {
    res.render('index', { name: 'User' });
});
app.get('/cadastrar', (req, res) => {
    res.render('pages/cadastro');
});
app.get('/login', (req, res) => {
    res.render('pages/login');
});
app.get('/home-user', (req, res) => {
    res.render('pages/home-user');
});
app.get('/pesquisa', (req, res) => {
    res.render('pages/pesquisa');
});
app.get('/cadastro-aprovado', (req, res) => {
    res.render('pages/cadastro-aprovado');
});
app.get('/sobre', (req, res) => {
    res.render('pages/sobre');
});
app.get('/solicitacoes', (req, res) => {
    res.render('pages/solicitacoes');
});

// API Routes
const welcomeRoute = require('./routes/api/routeWelcome')(connection);
app.use('/api/routeWelcome', welcomeRoute);

const logoutRoute = require('./routes/api/routeLogout')();
app.use('/api/routeLogout', logoutRoute);

const cadastroRoute = require('./routes/api/routeCadastro')(connection);
app.use('/api/routeCadastro', cadastroRoute);

const loginRoute = require('./routes/api/routeLogin')(connection);
app.use('/api/routeLogin', loginRoute);


app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
});



// connection.end((err) => {
//     if (err) return console.error(err.message);
//     console.log('Banco de dados fechado com sucesso.')
// })

