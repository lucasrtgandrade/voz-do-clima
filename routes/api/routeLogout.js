const express = require('express');

module.exports = function () {
    const router = express.Router();

    router.post('/', (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao sair' });
            }
            res.clearCookie('connect.sid'); // Clear the session cookie
            res.json({ message: 'Logout bem-sucedido' });
        });
    });

    return router;
};
