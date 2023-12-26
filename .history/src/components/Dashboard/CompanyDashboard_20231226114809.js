// src/components/Dashboard/CompanyDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

const CompanyDashboard = () => {
  const navigate = useNavigate();

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

      {/* Puedes agregar más botones o enlaces según sea necesario */}
    </Container>
  );
};

export default CompanyDashboard;
