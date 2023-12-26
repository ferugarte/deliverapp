// src/components/ResponsiveAppBar.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const ResponsiveAppBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userType, setUserType] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Ajusta esto según cómo estés manejando los tipos de usuario
        setUserType(user.type);
      } else {
        setUserType(null);
      }
    });
  }, [auth]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/login'); // Asume que tienes una ruta de inicio de sesión
  };

  const drawerContent = () => {
    switch (userType) {
      case 'driver':
        return (
          <>
            <ListItem button onClick={() => handleNavigation('/driver/status')}>
              <ListItemText primary="Cambiar Estado" />
            </ListItem>
            <ListItem button onClick={handleSignOut}>
              <ListItemText primary="Cerrar Sesión" />
            </ListItem>
          </>
        );
      case 'company':
        return (
          <>
            <ListItem button onClick={() => handleNavigation('/new-order')}>
              <ListItemText primary="Crear Nuevo Pedido" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/order-list')}>
              <ListItemText primary="Lista de Pedidos" />
            </ListItem>
            <ListItem button onClick={handleSignOut}>
              <ListItemText primary="Cerrar Sesión" />
            </ListItem>
          </>
        );
      case 'admin':
        // Agrega aquí las opciones para admin si las hay
        return <></>;
      default:
        return <></>;
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6">
            Mi Aplicación
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={handleDrawerToggle}>
        <List>
          {drawerContent()}
        </List>
      </Drawer>
    </div>
  );
};

export default ResponsiveAppBar;
