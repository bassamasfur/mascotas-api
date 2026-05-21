// Servicio para subir data de gatos y perros a Firebase Firestore
const admin = require('firebase-admin');
const fs = require('fs');

// Cambia la ruta al archivo de tu clave privada de Firebase
const serviceAccount = require('../../mascotas-data-firebase-adminsdk-fbsvc-ff92067f88.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function uploadBreeds(jsonPath, collectionName) {
  // 1. Borrar todos los documentos existentes en la colección
  const snapshot = await db.collection(collectionName).get();
  const batch = db.batch();
  snapshot.forEach(doc => {
    batch.delete(doc.ref);
  });
  await batch.commit();
  console.log(`Colección ${collectionName} borrada.`);

  // 2. Subir los nuevos datos
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  let count = 0;
  for (const breed of data) {
    // Usa el campo 'id' como identificador único
    if (!breed.id) {
      throw new Error(`Falta el campo 'id' en la raza: ${breed.nombre}`);
    }
    await db.collection(collectionName).doc(breed.id).set(breed);
    count++;
    console.log(`Subido: ${breed.nombre} (id: ${breed.id})`);
  }
  console.log(`Carga completa: ${collectionName} (${count} registros)`);
  return count;
}

// Descomenta la función que necesites ejecutar
// uploadBreeds('recursos/razas_perros_latam.json', 'razas_perros');
// uploadBreeds('recursos/razas_gatos_latam.json', 'razas_gatos');

module.exports = { uploadBreeds };