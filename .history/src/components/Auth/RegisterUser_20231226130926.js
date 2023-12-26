// src/components/Auth/RegisterUser.js
import React, { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { TextField, Button, Container, Typography } from '@mui/material';

const RegisterUser = () => {
  const [userData, setUserData] = useState({
    fechaNacimiento: '',
    numeroDocumento: '',
    tipoVehiculo: '',
    placaVehiculo: '',
    numeroWhatsapp: '',
  });
  const auth = getAuth();
  const firestore = getFirestore();

  const handleRegisterWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Guardar los datos del usuario en Firestore
      const userDocRef = doc(firestore, 'users', user.uid);
      await setDoc(userDocRef, {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        ...userData,
      });

      // Redireccionar o manejar el registro exitoso
    } catch (error) {
      console.error('Error al registrar con Google:', error);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Registro de Usuario
      </Typography>
      
      <TextField
        label="Fecha de Nacimiento"
        type="date"
        name="fechaNacimiento"
        value={userData.fechaNacimiento}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Número de Documento"
        name="numeroDocumento"
        value={userData.numeroDocumento}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Tipo de Vehículo"
        name="tipoVehiculo"
        value={userData.tipoVehiculo}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Placa del Vehículo"
        name="placaVehiculo"
        value={userData.placaVehiculo}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Número de WhatsApp"
        name="numeroWhatsapp"
        value={userData.numeroWhatsapp}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <Button variant="contained" color="primary" onClick={handleRegisterWithGoogle}>
        Registrarse con Google
      </Button>
    </Container>
  );
};

export default RegisterUser;
