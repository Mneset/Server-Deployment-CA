class ParticipantService {
    constructor(db) {
        this.db = db
    }

    async addParticipant(participant) {
        try {
            const newParticipantPersona = await this.db.Participant.create({
                email: participant.email, 
                firstName: participant.firstName, 
                lastName: participant.lastName,
                dob: participant.dob
            });
            const newParticipantHome = await this.db.Home.create({
                country: participant.Home.country, 
                city: participant.Home.city,
                ParticipantId: newParticipantPersona.id

            })
            const newParticipantWork = await this.db.Work.create({
                companyName: participant.Work.companyName, 
                salary: participant.Work.salary, 
                currency: participant.Work.currency,
                ParticipantId: newParticipantPersona.id
            })
            
            /* const newParticipant = {
                email: newParticipantPersona.email,
                firstName: newParticipantPersona.firstName,
                lastName: newParticipantPersona.lastName,
                dob: newParticipantPersona.dob,
                country: newParticipantHome.country,
                city: newParticipantHome.city,
                companyName: newParticipantWork.companyName,
                salary: newParticipantWork.salary,
                currency: newParticipantWork.currency,
            }; 

            return newParticipant */
            
            const newParticipant = await this.db.Participant.findOne({
                where: { id: newParticipantPersona.id},
                include: [
                    {model: this.db.Home},
                    {model: this.db.Work}
                ]
            })

            return newParticipant

            //Cleaner formatting

            
        } catch (error) {
            console.log("Error adding participant:", error)
            throw error
        }
    }

    async getAll() {
        try {
            const participants = await this.db.Participant.findAll({
                include: [
                    {model: this.db.Home},
                    {model: this.db.Work}
                ]
            });

            //Cleaner formatting

            /* return participants.map(p => ({
                email: p.email,
                firstName: p.firstName,
                lastName: p.lastName,
                dob: p.dob,
                country: p.Home.country,
                city: p.Home.city,
                companyName: p.Work.companyName,
                salary: p.Work.salary,
                currency: p.Work.currency,
            })); */

            return participants
        } catch (error) {
            console.log("Error fetching participants:", error);
            throw error;
        }
    }

    async getDetails() {
        try {
            const participants = await this.db.Participant.findAll({
                attributes: ['firstName', 'lastName', 'email']
            });
            return participants;
        } catch (error) {
            console.log("Error fetching participants with details:", error)
            throw error
        }
    }

    async getDetailsByEmail(email) {
        try {
            const participantDetails = await this.db.Participant.findOne({
                where: {email: email},
                attributes: ['firstName', 'lastName', 'dob']
            })

            participantDetails2 = {
                fristname: participantDetails.fristname + currency,

            }
            return participantDetails
        } catch (error) {
            console.log("Error fetching participant details:", error)
            throw error
        }
    }

    async getWorkByEmail() {

    }

    async 
}

module.exports = ParticipantService