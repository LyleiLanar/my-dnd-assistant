const express = require('express');
const routes = express.Router();
const commonController = require('../controllers/commons');

routes.get('/convert', commonController.getConvert);

module.exports = routes;
