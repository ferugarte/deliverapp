// src/components/Auth/RegisterUser.js
import React, { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { TextField, Button, Container, Typography, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const RegisterUser = () => {
  const [userData, setUserData] = useState({
    fechaNacimiento: '',
    numeroDocumento: '',
    tipoVehiculo: '',
    placaVehiculo: '',
    numeroWhatsapp: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const auth = getAuth();
  const firestore = getFirestore();

  const handleRegisterWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Verificar si el usuario ya existe
      const userDocRef = doc(firestore, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setSnackbarMessage('Ya existe un usuario registrado con ese correo.');
        setOpenSnackbar(true);
        return;
      }

      // Guardar los datos del usuario en Firestore
      await setDoc(userDocRef, {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        tipoUsuario: 'delivery', // Tipo de usuario por defecto
        ...userData,
      });

      setSnackbarMessage('¡Registro exitoso!');
      setOpenSnackbar(true);
      // Redireccionar o manejar el registro exitoso
    } catch (error) {
      console.error('Error al registrar con Google:', error);
      setSnackbarMessage('Error al registrar. Intente nuevamente.');
      setOpenSnackbar(true);
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
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RegisterUser;
