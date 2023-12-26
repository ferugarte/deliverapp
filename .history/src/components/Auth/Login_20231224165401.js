// src/components/Auth/Login.js
import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import { auth } from '../../firebase/config'; // Asegúrate de que la ruta a Firebase sea correcta

const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await auth.signInWithEmailAndPassword(loginData.email, loginData.password);
      // Redirigir a la página de dashboard o donde necesites
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
        <Button type="submit" variant="contained" color="primary">
          Iniciar Sesión
        </Button>
      </form>
    </Container>
  );
};

export default Login;
