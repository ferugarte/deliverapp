// src/components/CompanyAppBar.js
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Button, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const CompanyAppBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const auth = getAuth();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const menuItems = [
    { text: 'Crear Nuevo Pedido', path: '/order/new' },
    { text: 'Lista de Pedidos', path: '/orders' },
    { text: 'Cerrar Sesión', path: '/logout' } // Asegúrate de implementar la lógica de cierre de sesión
  ];

  const handleLogoff = () => {
    signOut(auth)
      .then(() => {
        // Redirigir al usuario a la página de inicio de sesión después de cerrar sesión
        navigate('/login');
      })
      .catch((error) => {
        // Manejar posibles errores aquí
        console.error('Error al cerrar sesión:', error);
      });
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
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Company Dashboard
          </Typography>
          {!isMobile && menuItems.map((item, index) => (
            <Button key={index} color="inherit" onClick={() => handleNavigation(item.path)}>
              {item.text}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={handleDrawerToggle}>
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={index} button onClick={() => handleNavigation(item.path)}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default CompanyAppBar;
