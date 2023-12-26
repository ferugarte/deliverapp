import { getAuth, signOut } from 'firebase/auth';

const Logout = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    console.log('Sesión cerrada con éxito');
    // Puedes realizar otras acciones después del cierre de sesión si es necesario
  } catch (error) {
    console.error('Error al cerrar la sesión:', error);
  }
};

export default Logout;