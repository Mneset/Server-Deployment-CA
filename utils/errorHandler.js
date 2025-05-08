const { ValidationError, UniqueConstraintError, ForeignKeyConstraintError } = require('sequelize');


function errorHandler(err, req, res, next) {

    if (err.status === 404) {
        console.error('Error handler:', err)
        return res.status(404).json({ error: err.message });
    }

    if(err instanceof ValidationError) {
        console.error('Error handler:', err)
        return res.status(400).json({error: err.errors.map(e => e.message).join(', ')})
    }

    if(err instanceof UniqueConstraintError) {
        console.error('Error handler:', err)
        return res.status(400).json({error: 'Unique constraint violation'})
    }

    if (err instanceof ForeignKeyConstraintError) {
        console.error('Error handler:', err)
        return res.status(400).json({ error: 'Foreign key constraint violation' });
    }
    
    if(err.status && err.status !== 500 && err.expose !== undefined) {
        console.error('Error handler:', err)
        return res.status(err.status).json({ error: err.message });
    }

    console.error('Error handler:', err)
    return res.status(500).json('Internal sever error')

}

module.exports = { errorHandler }