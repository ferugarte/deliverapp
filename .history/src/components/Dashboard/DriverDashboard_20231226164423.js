// src/components/Dashboard/DriverDashboard.js
import React from 'react';
import CompanyAppBar from '../DriverAppBar';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

const DriverDashboard = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleChangeStatus = () => {
    navigate('/driver/status'); // Redirige a la pantalla de cambio de estado
  };

  const handleLogoff = () => {
    signOut(auth)
      .then(() => {
        // Redirigir al usuario a la página de inicio de sesión después de cerrar sesión
        navigate('/login');
      })
      .catch((error) => {
        // Manejar posibles errores aquí
        console.error('Error al cerrar sesión:', error);
      });
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
