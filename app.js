const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const { initializeDb } = require('./config/database');

app.use(express.json());

const indexRouter = require('./routes/index')
const participantsRouter = require('./routes/participants')

app.use('/', indexRouter)
app.use('/participants', participantsRouter)

initializeDb()

app.listen(port, () => {
    console.log(`Server running on port ${port}`);  
});