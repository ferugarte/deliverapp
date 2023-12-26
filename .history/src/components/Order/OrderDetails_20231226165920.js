// src/components/Order/OrderDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [driver, setDriver] = useState(null);
  const [openDriverModal, setOpenDriverModal] = useState(false);
  const { id } = useParams();
  const firestore = getFirestore();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const orderDocRef = doc(firestore, 'orders', id);
      const orderDoc = await getDoc(orderDocRef);

      if (orderDoc.exists()) {
        setOrder(orderDoc.data());
        const driverDocRef = doc(firestore, 'users', orderDoc.data().assignedDriverId);
        const driverDoc = await getDoc(driverDocRef);

        if (driverDoc.exists()) {
          setDriver(driverDoc.data());
        }
      }
    };

    fetchOrderDetails();
  }, [id, firestore]);

  const handleOpenDriverModal = () => {
    setOpenDriverModal(true);
  };

  const handleCloseDriverModal = () => {
    setOpenDriverModal(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Detalles del Pedido
      </Typography>
      {/* ...otros detalles del pedido... */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleOpenDriverModal}
        style={{ marginTop: '20px' }}
      >
        Ver Detalles del Conductor
      </Button>

      {/* Modal para mostrar los detalles del conductor */}
      <Dialog open={openDriverModal} onClose={handleCloseDriverModal}>
        <DialogTitle>Detalles del Conductor</DialogTitle>
        <DialogContent>
          {driver ? (
            <>
              <DialogContentText><b>Nombre:</b> {driver.displayName}</DialogContentText>
              {/* Agrega aquí más detalles del conductor */}
            </>
          ) : (
            <DialogContentText>Cargando...</DialogContentText>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default OrderDetails;
