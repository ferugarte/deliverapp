// src/components/Order/OrderList.js
import React, { useState, useEffect } from 'react';
import { Container, List, ListItem, ListItemText } from '@mui/material';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Aquí deberías cargar los datos de los pedidos desde tu backend o Firebase
  }, []);

  return (
    <Container>
      <h2>Lista de Pedidos</h2>
      <List>
        {orders.map((order, index) => (
          <ListItem button key={index}>
            <ListItemText primary={`Pedido ${order.id}`} />
            {/* Agrega más detalles si es necesario */}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default OrderList;
