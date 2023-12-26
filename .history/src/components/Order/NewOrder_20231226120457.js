// src/components/Order/NewOrder.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { TextField, Button, Container, Typography, Snackbar, Alert } from '@mui/material';

const NewOrder = () => {
  const [orderData, setOrderData] = useState({
    description: '',
    startTime: '',
    endTime: ''
  });
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const firestore = getFirestore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const firestore = getFirestore();

    if (orderData.endTime <= orderData.startTime) {
      setError('La hora de finalización debe ser mayor que la hora de inicio.');
      setOpenSnackbar(true);
      return;
    }

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

       // Redirigir al usuario al CompanyDashboard después de un registro exitoso
       navigate('/dashboard/company');
      } catch (error) {
        console.error('Error al crear el pedido:', error);
        setError(error.message);
        setOpenSnackbar(true);
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
        <TextField
          label="Descripción del Pedido"
          name="description"
          value={orderData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
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
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
          <Alert onClose={() => setOpenSnackbar(false)} severity={error ? "error" : "success"} sx={{ width: '100%' }}>
            {error ? error : "Pedido creado exitosamente"}
          </Alert>
        </Snackbar>
      </form>
    </Container>
  );
};

export default NewOrder;
