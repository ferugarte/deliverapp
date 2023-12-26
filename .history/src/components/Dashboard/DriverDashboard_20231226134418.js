// src/components/Dashboard/DriverDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

const DriverDashboard = () => {
  const navigate = useNavigate();

  const handleChangeStatus = () => {
    navigate('/driver/status'); // Redirige a la pantalla de cambio de estado
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Panel del Repartidor
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleChangeStatus}
        style={{ marginTop: '20px' }}
      >
        Cambiar Estado
      </Button>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogoff}
        style={{ marginTop: '20px' }}
      >
        Cerrar Sesión
      </Button>
    </Container>
  );
};

export default DriverDashboard;
