// src/components/Driver/DriverStatus.js
import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import { Container, Typography, Switch, FormControlLabel } from '@mui/material';

const DriverStatus = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const auth = getAuth();
  const firestore = getFirestore();
  const user = auth.currentUser;

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
      const userDocRef = doc(firestore, 'users', user.uid);
      await updateDoc(userDocRef, { isAvailable: event.target.checked });
    }
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
    </Container>
  );
};

export default DriverStatus;
