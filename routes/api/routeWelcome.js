const express = require('express');

module.exports = function (db) {
    const router = express.Router();

    router.get('/', (req, res) => {
        if (!req.session.userId) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }

        const query = 'SELECT nome FROM cadastros WHERE cadastro_id = ?';
        db.query(query, [req.session.userId], (err, results) => {
            if (err) return res.status(500).json({ message: 'Erro no banco' });

            if (results.length === 0) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            const user = results[0];
            res.json({ message: `Bem-vindo, ${user.nome}!` });
        });
    });

    return router;
};
