// src/components/Order/MessageConfig.js
import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';

const MessageConfig = () => {
  const [messageConfig, setMessageConfig] = useState({
    // Configuraciones iniciales para el mensaje, como plantillas o formatos
  });

  const handleChange = (e) => {
    setMessageConfig({ ...messageConfig, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para guardar la configuración del mensaje en tu backend o Firebase
  };

  return (
    <Container>
      <h2>Configuración del Mensaje del Pedido</h2>
      <form onSubmit={handleSubmit}>
        {/* Agrega campos para configurar el mensaje aquí */}
        <TextField
          label="Mensaje"
          name="message"
          value={messageConfig.message}
          onChange={handleChange}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Guardar Configuración
        </Button>
      </form>
    </Container>
  );
};

export default MessageConfig;
