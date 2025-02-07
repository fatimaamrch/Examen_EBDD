const { DataTypes } = require('sequelize');
const sequelize = require('./config');

const Categorie = sequelize.define('Categorie', {
    nom: { type: DataTypes.STRING, allowNull: false },
}, {
    tableName: 'categories',
    timestamps: false
});

module.exports = Categorie;