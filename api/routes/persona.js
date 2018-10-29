'use strict'

var express = require('express');
var personaController = require('../controllers/persona');
var api = express.Router();

//api.get('/persona', personaController.getPersona); 
api.get('/infoestudiantes/:pag', personaController.getEstudiantes);
/*api.get('/infoestudios/:id', personaController.obt_infoestudios);
api.get('/infoexpelab/:id', personaController.obt_infoexpelab);
api.get('/redessociales/:id', personaController.obtredessociales);
api.get('/obtskill/:id', personaController.obtskill);*/
module.exports = api;