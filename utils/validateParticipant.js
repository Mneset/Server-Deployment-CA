function validateParticipant(req, res, next) {
    const participant = req.body;
    const errors = [];

    if (!participant.email || typeof participant.email !== 'string') {
        errors.push('Missing or invalid email');
    }
    if (!participant.firstName || typeof participant.firstName !== 'string') {
        errors.push('Missing or invalid firstName');
    }
    if (!participant.lastName || typeof participant.lastName !== 'string') {
        errors.push('Missing or invalid lastName');
    }
    if (!participant.dob || typeof participant.dob !== 'string') {
        errors.push('Missing or invalid dob');
    }

    if (!participant.Home || typeof participant.Home !== 'object') {
        errors.push('Missing Home object');
    } else {
        if (!participant.Home.country || typeof participant.Home.country !== 'string') {
            errors.push('Missing or invalid Home.country');
        }
        if (!participant.Home.city || typeof participant.Home.city !== 'string') {
            errors.push('Missing or invalid Home.city');
        }
    }

    if (!participant.Work || typeof participant.Work !== 'object') {
        errors.push('Missing Work object');
    } else {
        if (!participant.Work.companyName || typeof participant.Work.companyName !== 'string') {
            errors.push('Missing or invalid Work.companyName');
        }
        if (!participant.Work.salary || typeof participant.Work.salary !== 'number') {
            errors.push('Missing or invalid Work.salary');
        }
        if (!participant.Work.currency || typeof participant.Work.currency !== 'string') {
            errors.push('Missing or invalid Work.currency');
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
}

module.exports = validateParticipant;