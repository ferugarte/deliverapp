import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { TextField, Button, Box, Typography } from '@mui/material';

const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  const firestore = getFirestore();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (method) => {
    try {
      const userCredential = method === 'google' 
        ? await signInWithPopup(auth, new GoogleAuthProvider())
        : await signInWithEmailAndPassword(auth, loginData.email, loginData.password);

      // Obtener el tipo de usuario desde Firestore u otra base de datos
      const userDoc = await getDoc(doc(firestore, "users", userCredential.user.uid));
      const userType = userDoc.exists() ? userDoc.data().type : null;

      // Redirigir basado en el tipo de usuario
      if (userType === 'admin') {
        navigate('/dashboard/admin');
      } else if (userType === 'company') {
        navigate('/dashboard/company');
      } else if (userType === 'driver') {
        navigate('/dashboard/driver');
      } else {
        // Manejar casos desconocidos o mostrar error
      }
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Box p={3} boxShadow={3} borderRadius={2}>
      <Typography variant="h4" gutterBottom>
        Iniciar Sesión
      </Typography>

      {/* Formulario estándar de inicio de sesión */}
      <form onSubmit={(e) => { e.preventDefault(); handleLogin('email'); }}>
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
      <br/>
      <Button variant="contained" onClick={() => handleLogin('google')} style={{ background: '#db4437', color: '#fff' }} fullWidth>
        Iniciar Sesión con Google
      </Button>
      {loginError && <Typography color="error">{loginError}</Typography>}
      </Box>
    </Box>
  );
};

export default Login;
