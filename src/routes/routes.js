const express = require('express');
const router = express.Router();
const {getData, getDataFiltered, getForId, noExist} = require('../controllers/controllers');
const { miMiddleware } = require('../middlewares/miMiddleware');

router.use(miMiddleware);

router.get('/joyas', getData );

router.get('/joyas/filtros', getDataFiltered );

router.get('/joyas/joyas/:id', getForId);

router.get('/*', noExist );

module.exports = router;