// src/components/Order/EditOrder.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { TextField, Button, Container, Typography } from '@mui/material';

const EditOrder = () => {
  const [orderData, setOrderData] = useState({
    description: '',
    startTime: '',
    endTime: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const firestore = getFirestore();

  useEffect(() => {
    const fetchOrderData = async () => {
      const orderDocRef = doc(firestore, 'orders', id);
      const orderDoc = await getDoc(orderDocRef);

      if (orderDoc.exists()) {
        setOrderData(orderDoc.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchOrderData();
  }, [id]);

  const handleChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderDocRef = doc(firestore, 'orders', id);
      await updateDoc(orderDocRef, { ...orderData });

      navigate('/dashboard/company'); // Redirigir al dashboard de la empresa
    } catch (error) {
      console.error('Error al actualizar el pedido:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Editar Pedido
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
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
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
          Actualizar Pedido
        </Button>
      </form>
    </Container>
  );
};

export default EditOrder;
