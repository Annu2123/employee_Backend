const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors');
const configdb = require('./app/config/db');
const routes = require("./app/config/routes/routes")

dotenv.config();
configdb()
const app = express()
app.use(cors());
app.use(express.json())

app.use('/api', routes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server is running in port ${PORT}`)
})
