const db = require('../models');

async function initializeDb() {
    try {
        await db.sequelize.sync({ force: true });
        console.log('Database initialized');

        const participants = await db.Participant.bulkCreate([
            { email: 'john.doe@example.com', firstName: 'John', lastName: 'Doe', dob: '1990-01-01' },
            { email: 'jane.smith@example.com', firstName: 'Jane', lastName: 'Smith', dob: '1985-05-15' },
            { email: 'alice.jones@example.com', firstName: 'Alice', lastName: 'Jones', dob: '1992-07-20' },
            { email: 'bob.brown@example.com', firstName: 'Bob', lastName: 'Brown', dob: '1988-03-10' }
        ]);

        await db.Work.bulkCreate([
            { companyName: 'TechCorp', salaray: 60000, currency: 'USD', ParticipantId: participants[0].id },
            { companyName: 'Innovate Ltd', salaray: 75000, currency: 'USD', ParticipantId: participants[1].id },
            { companyName: 'BuildIt Inc', salaray: 50000, currency: 'USD', ParticipantId: participants[2].id },
            { companyName: 'DesignPro', salaray: 65000, currency: 'USD', ParticipantId: participants[3].id }
        ]);

        await db.Home.bulkCreate([
            { country: 'USA', city: 'New York', ParticipantId: participants[0].id },
            { country: 'Canada', city: 'Toronto', ParticipantId: participants[1].id },
            { country: 'UK', city: 'London', ParticipantId: participants[2].id },
            { country: 'Australia', city: 'Sydney', ParticipantId: participants[3].id }
        ]);

        await db.User.create(
            {username: "admin", password: 'P4ssword'}
        )

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Failed to initialize database:', error);
    }
}

module.exports = { initializeDb };