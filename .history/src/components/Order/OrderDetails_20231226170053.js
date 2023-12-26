// src/components/Order/OrderDetails.js
import React, { useState, useEffect } from 'react';
import CompanyAppBar from '../CompanyAppBar';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [driver, setDriver] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
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
  }, [id, firestore]);

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
    setOpenConfirmDialog(false); // Cerrar el diálogo de confirmación
    try {
      const orderDocRef = doc(firestore, 'orders', id);
      await deleteDoc(orderDocRef);
      navigate('/orders'); // Redirigir a la lista de pedidos después de borrar
    } catch (error) {
      console.error('Error al borrar el pedido:', error);
    }
  };

  const handleOpenDriverModal = () => {
    setOpenDriverModal(true);
  };

  const handleCloseDriverModal = () => {
    setOpenDriverModal(false);
  };

  return (
    <>
      <CompanyAppBar />
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Detalles del Pedido
      </Typography>
      {order ? (
        <div>
          <Typography variant="body1"><b>Descripción:</b> {order.description}</Typography>
          <Typography variant="body1"><b>Hora de Inicio:</b> {order.startTime}</Typography>
          <Typography variant="body1"><b>Hora de Fin:</b> {order.endTime}</Typography>
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
        onClick={() => setOpenConfirmDialog(true)}
        style={{ marginTop: '20px' }}
      >
        Borrar Pedido
      </Button>

      {/* Diálogo de confirmación de borrado */}
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>Confirmar Borrado</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que quieres borrar este pedido? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteOrder} color="secondary">
            Borrar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
    </>
  );
};

export default OrderDetails;
