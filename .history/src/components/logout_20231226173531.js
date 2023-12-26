// Ejemplo en CompanyAppBar.js o DriverAppBar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logout from './Logout'; // Ajusta la ruta de importación según sea necesario

const CompanyAppBar = () => {
  // ... código de tu AppBar ...
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout(() => navigate('/login'));
  };

  // ... código para renderizar tu AppBar ...
};

export default CompanyAppBar;
