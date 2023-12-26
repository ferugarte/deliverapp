// src/components/Dashboard/DriverDashboard.js
import React from 'react';
import DriverAppBar from '../DriverAppBar';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Paper, Container } from '@mui/material';

const DriverDashboard = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleChangeStatus = () => {
    navigate('/driver/status'); // Redirige a la pantalla de cambio de estado
  };

  return (
    <>
      <DriverAppBar />
      <Container maxWidth="lg">
      <Box sx={{ width: '75%',flexGrow: 1, p: 3 }}>
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
