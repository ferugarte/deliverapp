// src/logout.js
import { getAuth, signOut } from 'firebase/auth';

const logout = async (onSuccess) => {
  const auth = getAuth();
  try {
    await signOut(auth);
    console.log('Sesión cerrada con éxito');
    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    console.error('Error al cerrar la sesión:', error);
  }
};

export default logout;
