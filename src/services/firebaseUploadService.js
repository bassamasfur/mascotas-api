// Servicio para subir data de gatos y perros a Firebase Firestore

require('dotenv').config();

// Depuración: imprimir variables de entorno críticas
console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID ? '[OK]' : '[NO DEFINIDA]');
console.log('FIREBASE_CLIENT_EMAIL:', process.env.FIREBASE_CLIENT_EMAIL ? '[OK]' : '[NO DEFINIDA]');
console.log('FIREBASE_PRIVATE_KEY:', process.env.FIREBASE_PRIVATE_KEY ? '[OK]' : '[NO DEFINIDA]');

if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
  throw new Error('Faltan variables de entorno de Firebase. Revisa tu archivo .env');
}
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');


admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  })
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
  const absolutePath = path.join(process.cwd(), jsonPath);
  const data = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
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