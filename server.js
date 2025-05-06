import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import formularioRoutes from './routes/formularios.js';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/formularios', formularioRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Formularios funcionando correctamente');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Exportar la instancia de app como una exportación nombrada
export { app }; // Cambia 'export default app;' por esto