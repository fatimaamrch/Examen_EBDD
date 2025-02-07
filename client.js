const { DataTypes } = require('sequelize');
const sequelize = require('./config');

const Client = sequelize.define('Client', {
    nom: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    prenom: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    },
    telephone: { 
        type: DataTypes.STRING(20), 
        allowNull: true 
    },
    adresse: { 
        type: DataTypes.TEXT, 
        allowNull: true 
    }
}, {
    tableName: 'clients',
    timestamps: false
});

module.exports = Client;
