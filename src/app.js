const express = require('express');
const {applyMiddlewares} = require('./middlewares/middlewares')
const app = express();

require('dotenv').config();
const { PORT } = process.env;



applyMiddlewares(app);

app.listen(PORT, async() => {
    console.log(`servidor iniciado en puerto ${PORT}`);
});