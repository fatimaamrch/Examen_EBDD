const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: "Accès refusé, token manquant." });

    jwt.verify(token.split(" ")[1], 'secret_key', (err, decoded) => {
        if (err) return res.status(401).json({ message: "Token invalide." });
        req.user = decoded;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Accès refusé, rôle admin requis." });
    }
    next();
};

module.exports = { verifyToken, isAdmin };