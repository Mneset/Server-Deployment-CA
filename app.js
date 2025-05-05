const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const { initializeDb } = require('./config/database');

const indexRouter = require('./routes/index')

app.use('/', indexRouter)

initializeDb()

app.listen(port, () => {
    console.log(`Server running on port ${port}`);  
});