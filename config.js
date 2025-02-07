const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('gestion_stock', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307,
    logging: false,
});

module.exports = sequelize;