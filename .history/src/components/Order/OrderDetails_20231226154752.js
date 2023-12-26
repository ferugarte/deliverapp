// src/components/Order/OrderDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { Container, Typography, Button } from '@mui/material';

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [driver, setDriver] = useState(null);
  const { id } = useParams(); // ID del pedido desde la URL
  const navigate = useNavigate();
  const firestore = getFirestore();

  useEffect(() => {
    const getOrderDetails = async () => {
      const orderDoc = doc(firestore, 'orders', id);
      const docSnap = await getDoc(orderDoc);

      if (docSnap.exists()) {
        setOrder(docSnap.data());
        const driverDocRef = doc(firestore, 'users', docSnap.data().assignedDriverId);
        const driverDoc = await getDoc(driverDocRef);

        if (driverDoc.exists()) {
          setDriver(driverDoc.data());
        }
      } else {
        console.log('No such document!');
      }
    };

    getOrderDetails();
  }, [id]);

  const handleEdit = () => {
    // Navegar a la pantalla de edición de pedido
    navigate(`/order/edit/${id}`);
  };

  const handleBackToList = () => {
    navigate('/orders'); // Navegar de vuelta a la lista de pedidos
  };

  const viewDriverDetails = () => {
    if (order && order.assignedDriverId) {
      navigate(`/driver/details/${order.assignedDriverId}`);
    } else {
      console.log('Detalles del conductor no disponibles');
    }
  };

  const handleDeleteOrder = async () => {
    if (!id) {
      console.log('ID del pedido no definido');
      return;
    }

    try {
      const orderDocRef = doc(firestore, 'orders', id);
      await deleteDoc(orderDocRef);
      navigate('/orders'); // Redirigir a la lista de pedidos después de borrar
    } catch (error) {
      console.error('Error al borrar el pedido:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Detalles del Pedido
      </Typography>
      {order ? (
        <div>
          <Typography variant="body1"><b>Descripción:</b> {order.description}</Typography>
          <Typography variant="body1"><b>Hora de Inicio:</b> {order.startTime}</Typography>
          <Typography variant="body1"><b>Hora de Fin:</b> {order.endTime}</Typography>
          {driver && (
            <div>
              <Typography variant="body1"><b>Conductor Asignado:</b> {driver.displayName}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={viewDriverDetails}
                style={{ marginTop: '10px' }}
              >
                Ver Detalles del Conductor
              </Button>
            </div>
          )}
          {/* Agrega más detalles si es necesario */}
          <Button variant="contained" color="primary" onClick={handleEdit} style={{ marginTop: '20px' }}>
            Editar Pedido
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleBackToList} style={{ marginTop: '20px', marginLeft: '20px' }}>
            Volver a la Lista
          </Button>
        </div>
      ) : (
        <Typography variant="body1">Cargando detalles del pedido...</Typography>
      )}

      <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleDeleteOrder}
          style={{ marginTop: '20px' }}
      >
          Borrar Pedido
      </Button>
    </Container>
  );
};

export default OrderDetails;
