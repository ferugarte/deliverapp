// src/components/Order/NewOrder.js
import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { TextField, Button, Container, Typography } from '@mui/material';

const NewOrder = () => {
  const [orderData, setOrderData] = useState({
    description: '',
    startTime: '',
    endTime: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const firestore = getFirestore();

    if (auth.currentUser) {
      try {
        const newOrder = {
          userId: auth.currentUser.uid, // Usuario que crea el pedido
          description: orderData.description,
          startTime: orderData.startTime,
          endTime: orderData.endTime,
          // El número de pedido se autogenerará como ID del documento en Firestore
        };

        await addDoc(collection(firestore, 'orders'), newOrder);

        // Lógica después de crear el pedido (mostrar mensaje, limpiar formulario, etc.)
      } catch (error) {
        console.error('Error al crear el pedido:', error);
      }
    }
  };

  const handleChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Crear Nuevo Pedido
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextArea
          label="Descripción del Pedido"
          name="description"
          value={orderData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Hora de Inicio de Preparación"
          type="time"
          name="startTime"
          value={orderData.startTime}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Hora de Fin de Preparación"
          type="time"
          name="endTime"
          value={orderData.endTime}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Crear Pedido
        </Button>
      </form>
    </Container>
  );
};

export default NewOrder;
