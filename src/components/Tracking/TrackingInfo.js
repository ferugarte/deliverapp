// src/components/Tracking/TrackingInfo.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const TrackingInfo = ({ orderDetails }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Información de Seguimiento
        </Typography>
        <Typography color="textSecondary">
          Pedido ID: {orderDetails.id}
        </Typography>
        <Typography color="textSecondary">
          Estado del Pedido: {orderDetails.status}
        </Typography>
        {/* Agrega más información según sea necesario */}
      </CardContent>
    </Card>
  );
};

export default TrackingInfo;
