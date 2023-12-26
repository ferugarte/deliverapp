// src/components/Order/OrderList.js
import React, { useState, useEffect } from 'react';
import CompanyAppBar from '../CompanyAppBar';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container, Button } from '@mui/material';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const firestore = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const q = query(collection(firestore, 'orders'), where('userId', '==', user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const ordersArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersArray);
      });

      return () => unsubscribe();
    }
  }, [user, firestore]);

  const handleRowClick = (orderId) => {
    navigate(`/order/details/${orderId}`);
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard/company'); // Asume que este es el enlace al dashboard de la empresa
  };

  return (
    <>
      <CompanyAppBar />
    
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginTop: '20px' }}>
        Lista de Órdenes
      </Typography>
      <Button 
        variant="outlined" 
        color="secondary" 
        onClick={handleBackToDashboard} 
        style={{ marginBottom: '20px' }}
      >
        Volver al Dashboard
      </Button>
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Número de Pedido</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Hora de Inicio</TableCell>
            <TableCell>Hora de Fin</TableCell>
            {/* Agrega más columnas si es necesario */}
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} hover onClick={() => handleRowClick(order.id)}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.description}</TableCell>
              <TableCell>{order.startTime}</TableCell>
              <TableCell>{order.endTime}</TableCell>
              {/* Agrega más celdas si es necesario */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
    </>

  );
};

export default OrderList;
