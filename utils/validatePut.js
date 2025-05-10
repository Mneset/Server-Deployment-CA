function validatePut(req, res, next) {
    const participant = req.body;
    const errors = [];

    if(participant) {
        if (participant.email && typeof participant.email !== 'string') {
            errors.push('Invalid email: email needs to be a string');
        }
        if (participant.firstName && typeof participant.firstName !== 'string') {
            errors.push('Invalid firstName: firstName needs to be a string');
        }
        if (participant.lastName && typeof participant.lastName !== 'string') {
            errors.push('Invalid lastName: lastName needs to be a string');
        }
        if (participant.dob && typeof participant.dob !== 'string') {
            errors.push('Invalid dob: dob needs to be a string');
        }
    }

    if(participant.Home) {
        if (participant.Home && typeof participant.Home !== 'object') {
            errors.push('Invalid Home: Home needs to be an object');
        } else {
            if (participant.Home.country && typeof participant.Home.country !== 'string') {
                errors.push('Invalid country: Country needs to be a string');
            }
            if (participant.Home.city && typeof participant.Home.city !== 'string') {
                errors.push('Invalid city: city needs to be a string');
            }
        }
    }

    if(participant.Work) {
        if (!participant.Work && typeof participant.Work !== 'object') {
            errors.push('Invalid Work: work needs to be an object');
        } else {
            if (participant.Work.companyName && typeof participant.Work.companyName !== 'string') {
                errors.push('Invalid companyName: companyName needs to be a string');
            }
            if (participant.Work.salary && typeof participant.Work.salary !== 'number') {
                errors.push('Invalid salary: salary needs to be a number');
            }
            if (participant.Work.currency && typeof participant.Work.currency !== 'string') {
                errors.push('Invalid currency: currency needs to be a string');
            }
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
}

module.exports = validatePut;