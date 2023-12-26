// src/components/Auth/RegisterCompany.js
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { TextField, Button, Container, Typography } from '@mui/material';

const RegisterCompany = () => {
  const [companyData, setCompanyData] = useState({ email: '', password: '' });
  const [registerError, setRegisterError] = useState('');
  const auth = getAuth();
  const firestore = getFirestore();

  const handleChange = (e) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        companyData.email,
        companyData.password
      );

      // Guarda el tipo de usuario en Firestore
      await setDoc(doc(firestore, 'users', userCredential.user.uid), {
        email: companyData.email,
        type: 'company' // Tipo de usuario
      });

      // Redirige o realiza acciones posteriores al registro exitoso
    } catch (error) {
      setRegisterError(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Registro de Empresa
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Correo Electrónico"
          type="email"
          name="email"
          value={companyData.email}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Contraseña"
          type="password"
          name="password"
          value={companyData.password}
          onChange={handleChange}
          fullWidth
          required
        />
        {registerError && <Typography color="error">{registerError}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Registrar Empresa
        </Button>
      </form>
    </Container>
  );
};

export default RegisterCompany;
