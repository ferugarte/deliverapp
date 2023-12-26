// src/components/Order/OrderDetails.js
import React, { useState, useEffect } from 'react';
import CompanyAppBar from '../CompanyAppBar';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Box, Paper } from '@mui/material';


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

  return (
    <>
      <CompanyAppBar />
      <Container maxWidth="sm">
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

            <Typography variant="h5" gutterBottom>
              Detalles del Pedido
            </Typography>

            <Box sx={{ mt: 2 }}>
              {order ? (
                <div>
                  <Typography variant="body1"><b>Descripción:</b> {order.description}</Typography>
                  <Typography variant="body1"><b>Hora de Inicio:</b> {order.startTime}</Typography>
                  <Typography variant="body1"><b>Hora de Fin:</b> {order.endTime}</Typography>
                  {driver && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                      <Typography variant="body1"><b>Conductor Asignado:</b> {driver.displayName}</Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={viewDriverDetails}
                        style={{ marginTop: '10px' }}
                      >
                        Ver Detalles del Conductor
                      </Button>
                      </Box>
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
            </Box>

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
            </Paper>
        </Box>
      </Container>
    </>
  );
};

export default OrderDetails;