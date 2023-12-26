// src/components/Auth/RegisterUser.js
import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import { auth } from '../../firebase/config'; // Asegúrate de que la ruta a Firebase sea correcta

const RegisterUser = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    // Agrega otros campos necesarios
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Aquí debes agregar la lógica para registrar al usuario en Firebase
      // Por ejemplo, auth.createUserWithEmailAndPassword(...)
      // Y luego guardar otros datos del usuario en la base de datos de Firebase
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container>
      <h2>Registro de Usuario</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Correo Electrónico"
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contraseña"
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {/* Agrega aquí otros campos del formulario */}
        <Button type="submit" variant="contained" color="primary">
          Registrar
        </Button>
      </form>
    </Container>
  );
};

export default RegisterUser;
