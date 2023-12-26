// src/components/Auth/RegisterUser.js
import React, { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { TextField, Button, Container, Typography } from '@mui/material';

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
      tipoVehiculo: userData.tipoVehiculo,
      fechaNacimiento: userData.fechaNacimiento,
      numeroDocumento: userData.numeroDocumento,
      placaVehiculo: userData.placaVehiculo,
      numeroWhatsapp: userData.numeroWhatsapp,
      type: 'delivery'
      // Agrega aquí otros campos adicionales
    });

    // Redireccionar o manejar el registro exitoso
  } catch (error) {
    console.error('Error al registrar con Google:', error);
  }
};

const RegisterUser = () => {
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    numeroDocumento: '',
    tipoVehiculo: '',
    placaVehiculo: '',
    numeroWhatsapp: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        userData.email,
        userData.password
      );
      // Aquí puedes guardar más datos del usuario en Firestore si es necesario
    } catch (error) {
      console.error("Error en el registro del usuario:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Registro de Usuario
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          name="nombre"
          value={userData.nombre}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Apellido"
          name="apellido"
          value={userData.apellido}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {/* Continúa agregando los campos restantes de la misma manera */}
        <TextField
          label="Fecha de Nacimiento"
          name="fechaNacimiento"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={userData.fechaNacimiento}
          onChange={handleChange}
          fullWidth
          margin="normal"
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
          label="Número de Teléfono de WhatsApp"
          name="numeroWhatsapp"
          value={userData.numeroWhatsapp}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Correo Electrónico"
          name="email"
          type="email"
          value={userData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          value={userData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Registrar
        </Button>
      </form>
      <Button variant="contained" color="primary" onClick={handleRegisterWithGoogle}>
        Registrarse con Google
      </Button>
    </Container>
  );
};

export default RegisterUser;
