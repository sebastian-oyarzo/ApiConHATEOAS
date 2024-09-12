const express = require('express');
const router = express.Router();
const {getData, getDataFiltered, noExist} = require('../controllers/controllers');

router.get('/joyas', getData );

router.get('joyas/filtros',getDataFiltered)

router.get('/*', noExist );

module.exports = router;