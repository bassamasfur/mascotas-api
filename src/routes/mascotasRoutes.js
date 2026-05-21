
const express = require('express');
const router = express.Router();

const mascotasController = require('../controllers/mascotasController');
const firebaseController = require('../controllers/firebaseController');

// Endpoints para obtener razas desde Firebase
router.get('/razas/perros', firebaseController.getPerrosFromFirebase);
router.get('/razas/gatos', firebaseController.getGatosFromFirebase);

// CRUD
router.get('/', mascotasController.getAllMascotas);
router.get('/:id', mascotasController.getMascotaById);
router.post('/', mascotasController.createMascota);
router.put('/:id', mascotasController.updateMascota);
router.delete('/:id', mascotasController.deleteMascota);


// Endpoints para subir razas a Firebase
router.post('/upload/perros', firebaseController.uploadPerros);
router.post('/upload/gatos', firebaseController.uploadGatos);

module.exports = router;
