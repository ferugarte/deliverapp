import { createTheme } from '@mui/material/styles';

// Crea un tema utilizando la función createTheme
const theme = createTheme({
  palette: {
    // Define tus colores principales y secundarios
    primary: {
      main: '#556cd6', // Por ejemplo, un azul
    },
    secondary: {
      main: '#19857b', // Por ejemplo, un verde
    },
    error: {
      main: '#ff1744', // Rojo para errores
    },
    background: {
      default: '#fff', // Fondo por defecto
    },
  },
  typography: {
    // Aquí puedes personalizar la tipografía
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14, // Tamaño de fuente base
    button: {
      textTransform: 'none', // Estilo para botones, por ejemplo
    },
  },
  // Puedes agregar más configuraciones según tus necesidades
});

export default theme;
