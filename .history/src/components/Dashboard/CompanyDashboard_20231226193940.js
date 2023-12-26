// src/components/Dashboard/CompanyDashboard.js
import React from 'react';
import CompanyAppBar from '../CompanyAppBar';
import { Container, Box, Typography, Paper } from '@mui/material';
import useLatestOrders from '../../hooks/useLatestOrders';

const CompanyDashboard = () => {

  return (
    <>
      <CompanyAppBar />
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" gutterBottom>
              Panel de Control de la Empresa
            </Typography>

            {/* Puedes agregar más botones o enlaces según sea necesario */}
          </Paper>
      </Box>
      </Container>
    </>
  );
};

export default CompanyDashboard;
