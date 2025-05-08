module.exports = (sequelize, DataTypes) => {
    const Work = sequelize.define('Work', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        salary: {
            type: DataTypes.DECIMAL(10, 3),
            allowNull: false
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Work.associate = (db) => {
        Work.belongsTo(db.Participant)
    };

    return Work;
};