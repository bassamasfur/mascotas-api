const admin = require('firebase-admin');

// Obtener razas de perros desde Firebase
exports.getPerrosFromFirebase = async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection('razas_perros').get();
    const razas = snapshot.docs.map(doc => doc.data());
    res.json(razas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener razas de gatos desde Firebase
exports.getGatosFromFirebase = async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection('razas_gatos').get();
    const razas = snapshot.docs.map(doc => doc.data());
    res.json(razas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const { uploadBreeds } = require('../services/firebaseUploadService');

exports.uploadPerros = async (req, res) => {
  try {
    await uploadBreeds('recursos/razas_perros_latam.json', 'razas_perros');
    res.json({ mensaje: 'Razas de perros subidas a Firebase correctamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.uploadGatos = async (req, res) => {
  try {
    await uploadBreeds('recursos/razas_gatos_latam.json', 'razas_gatos');
    res.json({ mensaje: 'Razas de gatos subidas a Firebase correctamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
