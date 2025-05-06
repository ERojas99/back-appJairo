import express from 'express';
import { db, admin } from '../config/firebase-config.js';

const router = express.Router();

// Obtener todos los formularios
router.get('/', async (req, res) => {
  try {
    const formulariosSnapshot = await db.collection('formularios').get();
    const formularios = [];
    
    formulariosSnapshot.forEach(doc => {
      formularios.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    res.status(200).json(formularios);
  } catch (error) {
    console.error('Error al obtener formularios:', error);
    res.status(500).json({ error: 'Error al obtener los formularios' });
  }
});

// Registrar un nuevo formulario
router.post('/', async (req, res) => {
  try {
    const formData = req.body;
    
    // Validar datos obligatorios
    if (!formData.nombre || !formData.cedula) {
      return res.status(400).json({ error: 'Faltan campos obligatorios (nombre y cédula)' });
    }
    
    // Añadir fecha de creación
    const formularioData = {
      ...formData,
      fechaCreacion: admin.firestore.FieldValue.serverTimestamp()
    };
    
    // Crear registro en Firestore
    const formularioRef = await db.collection('formularios').add(formularioData);
    
    res.status(201).json({
      id: formularioRef.id,
      message: 'Formulario registrado exitosamente'
    });
  } catch (error) {
    console.error('Error al registrar formulario:', error);
    res.status(500).json({ error: 'Error al registrar el formulario' });
  }
});

// Buscar formulario por ID
router.get('/:id', async (req, res) => {
  try {
    const formularioDoc = await db.collection('formularios').doc(req.params.id).get();
    
    if (!formularioDoc.exists) {
      return res.status(404).json({ error: 'Formulario no encontrado' });
    }
    
    res.status(200).json({
      id: formularioDoc.id,
      ...formularioDoc.data()
    });
  } catch (error) {
    console.error('Error al buscar formulario:', error);
    res.status(500).json({ error: 'Error al buscar el formulario' });
  }
});

export default router;