// src/components/Order/OrderList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const firestore = getFirestore();

  useEffect(() => {
    const q = query(collection(firestore, 'orders'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ordersArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersArray);
    });

    return () => unsubscribe();
  }, []);

  const handleRowClick = (orderId) => {
    // Navegar a la pantalla de detalles o edición del pedido
    navigate(`/order/details/${orderId}`);
  };

  return (
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
  );
};

export default OrderList;
