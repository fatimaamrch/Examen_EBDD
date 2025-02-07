const { DataTypes } = require('sequelize');
const sequelize = require('./config');

const Utilisateur = sequelize.define('Utilisateur', {
    nom: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' }
}, {
    tableName: 'Utilisateurs',
    timestamps: false
});

module.exports = Utilisateur;