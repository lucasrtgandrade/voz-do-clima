const express = require('express');

module.exports = function (db) {
    const router = express.Router();

    router.post('/', (req, res) => {
        const {nome, sobrenome, email, senha} = req.body;
        console.log('Dados recebidos', {nome, sobrenome, email, senha});

        if (!nome || !sobrenome || !email || !senha) {
            return res.status(400).json({message: 'Campos faltando'});
        }

        const query = 'INSERT INTO cadastros (nome, sobrenome, email, senha) VALUES (?, ?, ?, ?)';
        db.query(query, [nome, sobrenome, email, senha], (err, result) => {
            if (err) {
                console.error('Erro do banco de dados:', err);
                return res.status(500).json({message: 'Erro no banco'});
            }
            res.status(200).json({message: 'Usuário cadastrado!'});
        });
    });
    return router;
};