// src/components/Driver/DriverDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Container, Typography } from '@mui/material';

const DriverDetails = () => {
  const [driver, setDriver] = useState(null);
  const { driverId } = useParams(); // Asegúrate de que la ruta a este componente use :driverId
  const firestore = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDriverDetails = async () => {
      const driverDocRef = doc(firestore, 'users', driverId);
      const driverDoc = await getDoc(driverDocRef);

      if (driverDoc.exists()) {
        setDriver(driverDoc.data());
      } else {
        console.log('Conductor no encontrado');
      }
    };

    fetchDriverDetails();
  }, [driverId]);

  const handleBack = () => {
    navigate(-1); // Navega una página hacia atrás en el historial del navegador
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Detalles del Conductor
      </Typography>
      {driver ? (
        <>
          <Typography variant="body1"><b>Nombre:</b> {driver.displayName}</Typography>
          <Typography variant="body1"><b>Email:</b> {driver.email}</Typography>
          <Typography variant="body1"><b>Tipo de Vehículo:</b> {driver.tipoVehiculo}</Typography>
          {/* Agrega aquí más detalles según la estructura de tus datos */}
        </>
      ) : (
        <Typography variant="body1">Cargando detalles del conductor...</Typography>
      )}

    <Button 
        variant="outlined" 
        color="primary" 
        onClick={handleBack}
        style={{ marginTop: '20px' }}
      >
        Volver a la pantalla anterior
      </Button>
    </Container>
  );
};

export default DriverDetails;
