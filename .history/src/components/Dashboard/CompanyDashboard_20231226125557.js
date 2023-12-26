// src/components/Dashboard/CompanyDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const auth = getAuth();

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
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Panel de Control de la Empresa
      </Typography>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate('/order/new')}
      >
        Crear Nuevo Pedido
      </Button>

      <Button 
        variant="contained" 
        color="secondary" 
        onClick={() => navigate('/orders')}
        style={{ marginLeft: '20px' }}
      >
        Lista de Pedidos
      </Button> 
      
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogoff}
        style={{ marginTop: '20px' }}
      >
        Cerrar Sesión
      </Button>

      {/* Puedes agregar más botones o enlaces según sea necesario */}
    </Container>
  );
};

export default CompanyDashboard;
