import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import warehouseIconUrl from "../assets/warehouse-marker.png"; // puedes usar un ícono propio

const warehouseIcon = new L.Icon({
  iconUrl: warehouseIconUrl,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

export default function MapView({ warehouses, onSelectWarehouse, selectedWarehouseId }) {
  const center = [21.0, -99.0]; // centro de México aproximado
  return (
    <MapContainer center={center} zoom={5.2} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {warehouses.map(wh => (
        <Marker
          key={wh.id}
          position={[wh.lat, wh.lng]}
          icon={warehouseIcon}
          eventHandlers={{
            click: () => onSelectWarehouse(wh.id)
          }}
        >
          <Popup>
            <strong>{wh.name}</strong>
            <br />
            {wh.address}
            <br />
            <button onClick={() => onSelectWarehouse(wh.id)}>
              Evaluar riesgo
            </button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}