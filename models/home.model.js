module.exports = (sequelize, DataTypes) => {
    const Home = sequelize.define('Home', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Home.associate = (db) => {
        Home.belongsTo(db.Participant)
    };

    return Home;
};