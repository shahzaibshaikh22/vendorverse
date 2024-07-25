import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};
const api_KEY = 'AIzaSyB4GtFaJ_WmxK8lP0beZh-Lg8U_zpNxGNQ'

const UserMap = () => {
  const [currentPosition, setCurrentPosition] = useState(center);

  const success = position => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    setCurrentPosition(currentPosition);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey={api_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={10}
      >
        <Marker position={currentPosition} />
      </GoogleMap>
    </LoadScript>
  )
}

export default UserMap;
