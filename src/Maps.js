import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

const icon = L.icon({
  iconUrl: "./placeholder.png",
  iconSize: [38, 38],
});

const defaultPosition = [51.505, -0.09];

function ResetCenterView({ selectPosition }) {
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView(L.latLng(selectPosition.lat, selectPosition.lon), 10, {
        animate: true,
      });
    }
  }, [selectPosition, map]);

  return null;
}

export default function Maps({ selectPosition }) {
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];

  return (
    <MapContainer
      center={defaultPosition}
      zoom={12}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=eeePVFE0aZ2bXiewMNU0"
      />
      {selectPosition && (
        <Marker position={locationSelection} icon={icon}>
          <Popup>
            lat - {selectPosition.lat} <br /> long - {selectPosition.lon}
          </Popup>
        </Marker>
      )}
      <ResetCenterView selectPosition={selectPosition} />
    </MapContainer>
  );
}
