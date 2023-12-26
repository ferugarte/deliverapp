// src/components/Order/NewOrder.js
import React, { useState } from 'react';
import CompanyAppBar from '../CompanyAppBar';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';
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
  const firestore = getFirestore();

  const assignOrderToDriver = async (newOrderData) => {
    const driversQuery = query(collection(firestore, 'users'), where('isAvailable', '==', true), where('type', '==', 'driver'));
    const driversSnapshot = await getDocs(driversQuery);

    let minAssignedDriver = { id: '', assignedOrdersCount: Infinity };
    
    driversSnapshot.forEach(doc => {
      const driverData = doc.data();
      if (driverData.assignedOrdersCount < minAssignedDriver.assignedOrdersCount 
        || driverData.assignedOrdersCount === undefined
        || isNaN(driverData.assignedOrdersCount) ) {
        minAssignedDriver = { id: doc.id, ...driverData };
      }
    });

    if (minAssignedDriver.id) {
      // Crear el nuevo pedido con el conductor asignado
      const orderData = { ...newOrderData, assignedDriverId: minAssignedDriver.id };
      const newOrderRef = await addDoc(collection(firestore, 'orders'), orderData);

      // Incrementar el conteo de pedidos asignados del conductor
      const driverDocRef = doc(firestore, 'users', minAssignedDriver.id);
      await updateDoc(driverDocRef, {
        assignedOrdersCount: (isNaN(minAssignedDriver.assignedOrdersCount)?0:minAssignedDriver.assignedOrdersCount) + 1
      });
    } else {
      // Manejar el caso en que no haya conductores disponibles
      console.log('No hay conductores disponibles');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    if (orderData.endTime <= orderData.startTime) {
      setError('La hora de finalización debe ser mayor que la hora de inicio.');
      setOpenSnackbar(true);
      return;
    }

    if (auth.currentUser) {
      try {
        const newOrderData = {
          userId: auth.currentUser.uid, // Usuario que crea el pedido
          description: orderData.description,
          startTime: orderData.startTime,
          endTime: orderData.endTime,
          createdAt: new Date(),
          state: "pendiente"
          // El número de pedido se autogenerará como ID del documento en Firestore
        };

        // Asignar pedido a conductor disponible
        assignOrderToDriver(newOrderData);

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
    setError('');
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard/company'); // Asume que este es el enlace al dashboard de la empresa
  };

  return (
    <>
      <CompanyAppBar />
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

        <Button 
          variant="outlined" 
          color="secondary" 
          onClick={handleBackToDashboard} 
          style={{ marginTop: '20px' }} 
          fullWidth
        >
          Volver al Dashboard
        </Button>

      </form>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={error ? "error" : "success"} sx={{ width: '100%' }}>
          {error ? error : "Pedido creado exitosamente"}
        </Alert>
      </Snackbar>
    </Container>
    </>
  );
};

export default NewOrder;
