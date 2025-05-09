class ParticipantService {
    constructor(db) {
        this.db = db
    }

    async addParticipant(participant) {

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
    }

    async getAll() {
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
    }

    async getParticipant(email) {
        const participant = await this.db.Participant.findOne({
            where: { email: email },
            include: [
                {model: this.db.Home},
                {model: this.db.Work}
            ]
        })

        return participant
    }

    async getDetails() {
            const participants = await this.db.Participant.findAll({
                attributes: ['firstName', 'lastName', 'email']
            });
            return participants;
        }

    async getDetailsByEmail(email) {
            const participantDetails = await this.db.Participant.findOne({
                where: {email: email},
                attributes: ['firstName', 'lastName', 'dob']
            })

            return participantDetails
    }

    async getWorkByEmail(email) {
            const participant = await this.db.Participant.findOne({
                where: {email: email},
                include: [
                        {model: this.db.Work}
                ]
            })

            const workdetails = {
                companyName: participant.Work.companyName,
                salary: participant.Work.salary,
                currency: participant.Work.currency
            }

            return workdetails
    }

    async getHomeByEmail(email) {
            const participant = await this.db.Participant.findOne({
                where: {email: email},
                include: [
                        {model: this.db.Home}
                ]
            })

            const homedetails = {
                country: participant.Home.country,
                city: participant.Home.city
            }

            return homedetails
    }
    
    async deleteParticipant(email, participant) {
 
        await this.db.Participant.destroy({
            where: { email: email }
        });
    
        console.log('Deleted participant and associated records:', participant);
    
        return participant;
    }

    async updateParticipant(updatedData, participant) {
        let affectedRows = 0

        const [participantRowsAffected] = await this.db.Participant.update(
            {
                email: updatedData.email,
                firstName: updatedData.firstName,
                lastName: updatedData.lastName,
                dob: updatedData.dob,
            }, 
            { where: {email: participant.email} },
        )
        affectedRows += participantRowsAffected
        
        if(updatedData.Home) {
        const [homeRowsAffected] = await this.db.Home.update(
            {
                country: updatedData.Home.country,
                city: updatedData.Home.city
            },
            { where: {ParticipantId: participant.id} }
        )
        affectedRows += homeRowsAffected
    }

    if(updatedData.Work) {
        const [workRowsAffected] = await this.db.Work.update(
            {
                companyName: updatedData.Work.companyName,
                salary: updatedData.Work.salary,
                currency: updatedData.Work.currency
            },
            { where: {ParticipantId: participant.id} }
        )
        affectedRows += workRowsAffected
    }
        
        const updatedParticipant = await this.db.Participant.findOne({
            where: { email: updatedData.email || participant.email },
            include: [
                { model: this.db.Home },
                { model: this.db.Work }
            ]
        })     

        return [affectedRows, updatedParticipant]         
    }
}

module.exports = ParticipantService