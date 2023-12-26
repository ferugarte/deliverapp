// src/components/Auth/RegisterCompany.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { TextField, Button, Container, Typography, Snackbar, Alert } from '@mui/material';

const RegisterCompany = () => {
  const [companyData, setCompanyData] = useState({ email: '', password: '' });
  const [registerError, setRegisterError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
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

      await setDoc(doc(firestore, 'users', userCredential.user.uid), {
        email: companyData.email,
        type: 'company'
      });

      // Mostrar el Snackbar antes de la redirección
      setOpenSnackbar(true);

      // Espera un poco antes de redirigir para que el usuario vea el mensaje
      setTimeout(() => {
        navigate('/login');
      }, 3000);
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

      <Button 
        variant="contained" 
        onClick={handleGoogleRegister} 
        style={{ background: '#db4437', color: '#fff', marginTop: '20px' }} 
        fullWidth
      >
        Registrarse con Google
      </Button>
      
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          ¡Registro exitoso!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RegisterCompany;
