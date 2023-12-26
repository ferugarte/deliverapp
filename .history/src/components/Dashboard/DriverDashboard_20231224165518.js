// src/components/Dashboard/DriverDashboard.js
import React from 'react';
import { Container, Typography } from '@mui/material';

const DriverDashboard = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Panel del Repartidor
      </Typography>
      {/* Aquí puedes agregar componentes o funciones específicas para los repartidores, como listas de entregas, mapas, etc. */}
    </Container>
  );
};

export default DriverDashboard;
