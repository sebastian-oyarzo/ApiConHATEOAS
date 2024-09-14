const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const router = require('../routes/routes');



const applyMiddlewares = (app) => {
  app.use(morgan('dev'));
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/', router);
};



module.exports = { applyMiddlewares };
