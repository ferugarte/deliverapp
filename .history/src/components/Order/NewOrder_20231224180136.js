// src/components/Order/NewOrder.js
import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';

const NewOrder = () => {
  const [newOrder, setNewOrder] = useState({
    // Define aquí los campos necesarios para un nuevo pedido
  });

  const handleChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar el nuevo pedido a tu backend o Firebase
  };

  return (
    <Container>
      <h2>Crear Nuevo Pedido</h2>
      <form onSubmit={handleSubmit}>
        {/* Agrega los campos del formulario aquí */}
        <TextField
          label="Detalle del Pedido"
          name="detail"
          value={newOrder.detail}
          onChange={handleChange}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Crear Pedido
        </Button>
      </form>
    </Container>
  );
};

export default NewOrder;
