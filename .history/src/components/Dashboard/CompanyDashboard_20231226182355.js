// src/components/Dashboard/CompanyDashboard.js
import React from 'react';
import CompanyAppBar from '../CompanyAppBar';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { Button, Container, Typography } from '@mui/material';

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  return (
    <>
      <CompanyAppBar />
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
          color="primary" 
          onClick={() => navigate('/orders')}
          style={{ marginLeft: '20px' }}
        >
          Lista de Pedidos
        </Button> 

        {/* Puedes agregar más botones o enlaces según sea necesario */}
      </Container>
    </>
  );
};

export default CompanyDashboard;
