"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const markers = [
  {
    pos: [60.7943, 11.0681] as [number, number],
    label: "Teknologibygget (hoveddør)",
  },
  { pos: [60.7947, 11.0675] as [number, number], label: "Auditorium A & B" },
  {
    pos: [60.7939, 11.0688] as [number, number],
    label: "Kantine / Fellesareal",
  },
  { pos: [60.7941, 11.067] as [number, number], label: "Parkering" },
  {
    pos: [60.7945, 11.0685] as [number, number],
    label: "Lab 1 & Lab 2 / Klasserom (Teknologibygget)",
  },
];

export default function Map() {
  useEffect(() => {
    /* Force leaflet to recalculate tiles after hydration */
    window.dispatchEvent(new Event("resize"));
  }, []);

  return (
    <MapContainer
      center={[60.7943, 11.0681]}
      zoom={17}
      style={{ height: "65vh", width: "100%", borderRadius: "0.75rem" }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((m) => (
        <Marker key={m.label} position={m.pos} icon={icon}>
          <Popup>{m.label}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
