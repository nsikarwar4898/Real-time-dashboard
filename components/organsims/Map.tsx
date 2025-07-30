"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import {
  CENTER_COORDINATES,
  MAP_HEIGHT,
  MAP_WIDTH,
  TILE_LAYER_ATTRIBUTION,
  TILE_LAYER_URL,
  ZOOM_LEVEL,
} from "@/lib/utils/coordinates";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

//locations will come from the api
const LOCATIONS: { lat: number; lng: number; label: string }[] = [
  { lat: 28.6139, lng: 77.209, label: "Delhi" },
  { lat: 19.076, lng: 72.8777, label: "Mumbai" },
  { lat: 13.0827, lng: 80.2707, label: "Chennai" },
];

export default function Map() {
  return (
    <MapContainer
      center={CENTER_COORDINATES}
      zoom={ZOOM_LEVEL}
      scrollWheelZoom={true}
      style={{ height: MAP_HEIGHT, width: MAP_WIDTH }}
    >
      <TileLayer attribution={TILE_LAYER_ATTRIBUTION} url={TILE_LAYER_URL} />
      {LOCATIONS.map((location, idx) => (
        <Marker key={idx} position={[location.lat, location.lng]}>
          <Popup>{location.label}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
