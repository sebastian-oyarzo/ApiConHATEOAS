const express = require('express');
const app = express();
const router = require('./routes/routes')
require('dotenv').config();
const { PORT } = process.env;


app.use(express.json());
app.use('/', router);


app.listen(PORT, async() => {
    console.log(`servidor iniciado en puerto ${PORT}`)
});