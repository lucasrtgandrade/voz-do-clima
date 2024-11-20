const express = require('express');

module.exports = function (db) {
    const router = express.Router();

    router.post('/', (req, res) => {
        const { email, senha } = req.body;

        const query = 'SELECT * FROM cadastros WHERE email = ?';
        db.query(query, [email], (err, result) => {
            if (err) return res.status(500).json({message: err});

            if (result.length === 0) return res.status(401).json({message: 'Email faltando'});

            const user = result[0];
            if (senha === user.senha) {
                req.session.userId = user.cadastro_id;
                res.json({message: 'Login com sucesso'});
            } else {
                res.status(401).json({message: 'Senha inválida'});
            }
        });
    });
    return router;
};


//     if (!email || !senha) {
//         return res.status(400).json({ message: 'Campos faltando' });
//     }
//
//     const query = 'SELECT * FROM cadastros WHERE email = ?';
//     db.query(query, [email], (err, results) => {
//         if (err) {
//             console.error('Erro do banco de dados:', err);
//             return res.status(500).json({ message: 'Erro no banco' });
//         }
//
//         if (results.length === 0) {
//             return res.status(401).json({ message: 'Email não encontrado' });
//         }
//
//         const user = results[0];
//
//         // Directly compare passwords since they are not hashed
//         if (senha === user.senha) {
//             res.json({ message: 'Login com sucesso' });
//         } else {
//             res.status(401).json({ message: 'Senha inválida' });
//         }
//     });
// });