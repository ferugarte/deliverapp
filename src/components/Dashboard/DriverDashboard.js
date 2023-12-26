// src/components/Dashboard/DriverDashboard.js
import React from 'react';
import DriverAppBar from '../DriverAppBar';
import { Box, Typography, Paper, Container } from '@mui/material';

const DriverDashboard = () => {

  return (
    <>
      <DriverAppBar />
      <Container maxWidth="lg">
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        
        <Typography variant="h4" component="h1" gutterBottom>
          Panel del Repartidor
        </Typography>
      </Paper>
     </Box>
     </Container>
    </>
  );
};

export default DriverDashboard;
