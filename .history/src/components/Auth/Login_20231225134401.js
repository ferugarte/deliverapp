// src/components/Auth/Login.js
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { TextField, Button, Container, Typography } from '@mui/material';

const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const auth = getAuth();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then((userCredential) => {
        // Usuario ha iniciado sesión con email y contraseña
        // Puedes redirigir al usuario o manejar la sesión aquí
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Usuario ha iniciado sesión con Google
        // Puedes redirigir al usuario o manejar la sesión aquí
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Iniciar Sesión
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Correo Electrónico"
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contraseña"
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {loginError && <Typography color="error">{loginError}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Iniciar Sesión
        </Button>
      </form>
      <Typography variant="body1" style={{ margin: '20px 0' }}>
        o
      </Typography>
      <Button variant="contained" onClick={handleGoogleLogin} style={{ background: '#db4437', color: '#fff' }} fullWidth>
        Iniciar Sesión con Google
      </Button>
    </Container>
  );
};

export default Login;
