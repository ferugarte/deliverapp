import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const logout = async () => {
  const auth = getAuth();
  const navigate = useNavigate();

  try {
    await signOut(auth)
    .then(() => {
      // Redirigir al usuario a la página de inicio de sesión después de cerrar sesión
      navigate('/login');
    });
    console.log('Sesión cerrada con éxito');
    // Puedes realizar otras acciones después del cierre de sesión si es necesario
  } catch (error) {
    console.error('Error al cerrar la sesión:', error);
  }
};

export default logout;