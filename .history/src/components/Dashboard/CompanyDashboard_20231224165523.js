// src/components/Dashboard/CompanyDashboard.js
import React from 'react';
import { Container, Typography } from '@mui/material';

const CompanyDashboard = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Panel de la Empresa
      </Typography>
      {/* Aquí puedes agregar componentes o funciones específicas para las empresas, como creación de pedidos, seguimiento de entregas, etc. */}
    </Container>
  );
};

export default CompanyDashboard;
