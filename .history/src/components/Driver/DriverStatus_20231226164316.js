// src/components/Driver/DriverStatus.js
import React, { useState, useEffect } from 'react';
import CompanyAppBar from '../CompanyAppBar';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Container, Typography, Switch, FormControlLabel, Snackbar, Alert, Button } from '@mui/material';

const DriverStatus = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const auth = getAuth();
  const firestore = getFirestore();
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    // Carga el estado actual de disponibilidad del conductor
    const fetchDriverStatus = async () => {
      if (user) {
        const userDocRef = doc(firestore, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setIsAvailable(userDoc.data().isAvailable);
        }
      }
    };

    fetchDriverStatus();
  }, [user, firestore]);

  const handleStatusChange = async (event) => {
    setIsAvailable(event.target.checked);
    if (user) {
      try {
        const userDocRef = doc(firestore, 'users', user.uid);
        await updateDoc(userDocRef, { isAvailable: event.target.checked });

        setOpenSnackbar(true); // Abre el Snackbar después de actualizar el estado
      } catch (error) {
        console.error('Error al actualizar el estado:', error);
      }
    }
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard/driver'); // Redirige al dashboard del conductor
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Estado del Conductor
      </Typography>
      <FormControlLabel
        control={<Switch checked={isAvailable} onChange={handleStatusChange} />}
        label={isAvailable ? 'Disponible' : 'No Disponible'}
      />
      <div style={{ marginTop: '20px' }}> {/* Contenedor para el botón */}
        <Button 
          variant="outlined" 
          color="secondary" 
          onClick={handleBackToDashboard}
          fullWidth
        >
          Volver a la Pantalla Principal
        </Button>
      </div>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Estado modificado exitosamente
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default DriverStatus;
