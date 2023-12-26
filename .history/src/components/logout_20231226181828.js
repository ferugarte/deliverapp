// src/components/Logout.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Redirige al usuario a la página de inicio de sesión después de cerrar sesión
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
        // Manejar errores aquí, como redirigir a una página de error si lo deseas
      });
  }, [navigate]);

  // Puedes retornar un spinner, un mensaje o simplemente null mientras se cierra la sesión
  return null;
};

export default Logout;
