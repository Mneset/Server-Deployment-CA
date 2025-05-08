const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const { initializeDb } = require('./config/database');
const createError = require('http-errors');
const { errorHandler } = require('./utils/errorHandler');

app.use(express.json());

const indexRouter = require('./routes/index')
const participantsRouter = require('./routes/participants');

app.use('/', indexRouter)
app.use('/participants', participantsRouter)

initializeDb()

app.use((req, res, next) => {
    next(createError(404, 'Route not found'));
});

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);  
});