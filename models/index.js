const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const sequelize = new Sequelize({
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    define: {
        underscored: process.env.DB_UNDERSCORED === 'true',
        timestamps: process.env.DB_TIMESTAMPS === 'true'
    }
});

const db = {};
db.sequelize = sequelize;

fs.readdirSync(__dirname)
    .filter(file => file.endsWith('.model.js'))
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

console.log("Loaded models:", Object.keys(db));

module.exports = db;