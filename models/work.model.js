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
            type: DataTypes.DECIMAL(20, 2),
            allowNull: false
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Work.associate = (db) => {
        Work.belongsTo(db.Participant, {foreignKey: 'ParticipantId', onDelete: 'CASCADE'})
    };

    return Work;
};