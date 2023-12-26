// src/components/Tracking/MapView.js
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const MapView = ({ deliveryLocation }) => {
  const [mapCenter, setMapCenter] = useState({ lat: -34.397, lng: 150.644 });

  useEffect(() => {
    if (deliveryLocation) {
      setMapCenter(deliveryLocation);
    }
  }, [deliveryLocation]);

  return (
    <LoadScript
      googleMapsApiKey="TU_API_KEY_DE_GOOGLE_MAPS" // Reemplaza con tu API key
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={10}
      >
        {/* Si deseas agregar marcadores */}
        {deliveryLocation && <Marker position={deliveryLocation} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapView;
