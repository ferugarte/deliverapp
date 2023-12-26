// src/components/Logout.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { CircularProgress, Box, Typography } from '@mui/material';

const Logout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setIsLoading(false);
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
        setIsLoading(false);
        // Aquí puedes manejar cómo mostrar el error
      });
  }, [navigate]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
        <Typography variant="h6" marginLeft={2}>Cerrando sesión...</Typography>
      </Box>
    );
  }

  // Retorna null o redirige en caso de que el cierre de sesión falle y no se quiera mantener al usuario en esta página
  return null;
};

export default Logout;
