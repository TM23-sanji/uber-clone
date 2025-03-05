import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for missing marker icons in Leaflet when using Webpack
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapComponent = () => {
  const position = [23.2547, 77.4029];

  return (
    <MapContainer center={position} zoom={13} style={{height:"100%", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {/* Marker Example */}
      <Marker position={position} icon={customIcon}>
        <Popup>Bhopal</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
