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
            unique: true,
            validate: {
                isEmail: true
            }
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
            allowNull: false,
            validate: {
                isBeforeToday(value) {
                    if(new Date(value) >= new Date()) {
                        throw new Error('Date of birth must be before today')
                    }
                }
            }
        }
    });

    Participant.associate = (db) => {
        Participant.hasOne(db.Work, {foreignKey: 'ParticipantId', onDelete: 'CASCADE'})
        Participant.hasOne(db.Home, {foreignKey: 'ParticipantId', onDelete: 'CASCADE'})
    };

    return Participant;
};