// src/components/Auth/Login.js
import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Button } from '@mui/material';

const Login = () => {
  const auth = getAuth();

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // El usuario ha iniciado sesión con Google
        // Puedes obtener la información del usuario de result.user
      })
      .catch((error) => {
        // Manejar errores aquí, como cuenta de email ya existente
        console.error(error);
      });
  };

  return (
    <div>
      {/* Tus otros elementos de inicio de sesión aquí */}
      <Button variant="contained" onClick={handleGoogleLogin}>
        Iniciar Sesión con Google
      </Button>
    </div>
  );
};

export default Login;
