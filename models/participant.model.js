module.exports = (sequelize, DataTypes) => {
    const Participant = sequelize.define('Participant', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    });

    Participant.associate = (db) => {
        Participant.hasOne(db.Work)
        Participant.hasOne(db.Home)
    };

    return Participant;
};