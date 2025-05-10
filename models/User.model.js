module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        encryptedPassword: {
            type: DataTypes.BLOB,
            allowNull: false
        },
        salt: {
            type: DataTypes.BLOB,
            allowNull: false
        }
    });

    User.associate = (db) => {

    };

    return User;
};