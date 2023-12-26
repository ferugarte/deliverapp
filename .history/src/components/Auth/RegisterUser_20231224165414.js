// src/components/Auth/RegisterCompany.js
import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import { auth } from '../../firebase/config'; // Asegúrate de que la ruta a Firebase sea correcta

const RegisterCompany = () => {
  const [companyData, setCompanyData] = useState({
    email: '',
    password: '',
    // Agrega otros campos necesarios
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCompanyData({ ...companyData, [e.target.name]: e
