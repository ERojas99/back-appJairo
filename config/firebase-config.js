import admin from 'firebase-admin';
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let serviceAccount;

// Verificar si existe la variable de entorno FIREBASE_CREDENTIALS
if (process.env.FIREBASE_CREDENTIALS) {
  try {
    // Intentar parsear las credenciales desde la variable de entorno
    serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);
    console.log('Usando credenciales de Firebase desde variable de entorno');
  } catch (error) {
    console.error('Error al parsear las credenciales de Firebase desde la variable de entorno:', error);
    process.exit(1);
  }
} else {
  // Si no hay variable de entorno, usar el archivo local
  try {
    // Ruta al archivo de credenciales
    const serviceAccountPath = path.resolve(__dirname, '../formularioapp-keyfirebase.json');
    
    // Importar el archivo de credenciales
    const require = createRequire(import.meta.url);
    serviceAccount = require(serviceAccountPath);
    console.log('Usando credenciales de Firebase desde archivo local');
  } catch (error) {
    console.error('Error al cargar las credenciales de Firebase desde archivo local:', error);
    process.exit(1);
  }
}

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