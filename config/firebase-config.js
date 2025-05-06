import admin from 'firebase-admin';
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al archivo de credenciales
const serviceAccountPath = path.resolve(__dirname, '../formularioapp-keyfirebase.json');

// Importar el archivo de credenciales
const require = createRequire(import.meta.url);
const serviceAccount = require(serviceAccountPath);

// Inicializar Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});

// Configurar Firestore para ignorar propiedades undefined
const db = admin.firestore();
db.settings({
  ignoreUndefinedProperties: true
});

export { admin, db };