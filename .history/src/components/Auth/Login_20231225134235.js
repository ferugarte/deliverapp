// src/components/Auth/Login.js
import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { TextField, Button, Container, Typography } from '@mui/material';

const Login = () => {
  // ...Tu estado y funciones para el inicio de sesión estándar

  const handleGoogleLogin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Usuario ha iniciado sesión con Google
        // Puedes obtener la información del usuario de result.user
      })
      .catch((error) => {
        // Manejar errores aquí
        console.error(error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Iniciar Sesión
      </Typography>
      <form onSubmit={/* tu función de manejo del envío del formulario */}>
        <TextField
          label="Correo Electrónico"
          name="email"
          type="email"
          // ...resto de tus props
        />
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          // ...resto de tus props
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Iniciar Sesión
        </Button>
      </form>
      <Typography variant="body1" style={{ margin: '20px 0' }}>
        o
      </Typography>
      <Button variant="contained" onClick={handleGoogleLogin} style={{ background: '#db4437', color: '#fff' }}>
        Iniciar Sesión con Google
      </Button>
    </Container>
  );
};

export default Login;
