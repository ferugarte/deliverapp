// src/components/Order/OrderDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState({});
  const { orderId } = useParams(); // Asume que estás usando React Router

  useEffect(() => {
    // Cargar detalles del pedido basado en orderId desde tu backend o Firebase
  }, [orderId]);

  return (
    <Container>
      <Typography variant="h4" component="h1">
        Detalles del Pedido
      </Typography>
      {/* Mostrar los detalles del pedido aquí */}
    </Container>
  );
};

export default OrderDetails;
