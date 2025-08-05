'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import {
  CENTER_COORDINATES,
  MAP_HEIGHT,
  MAP_WIDTH,
  TILE_LAYER_ATTRIBUTION,
  TILE_LAYER_URL,
  ZOOM_LEVEL,
} from '@/lib/utils/coordinates';
import { Location } from '@/lib/types/types';

delete (L.Icon.Default.prototype as unknown as { _getIconUrl: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

type MapProps = {
  locations: Location[];
};

export default function Map({ locations }: MapProps) {
  return (
    <MapContainer
      center={CENTER_COORDINATES}
      zoom={ZOOM_LEVEL}
      scrollWheelZoom={true}
      style={{ height: MAP_HEIGHT, width: MAP_WIDTH }}
    >
      <TileLayer attribution={TILE_LAYER_ATTRIBUTION} url={TILE_LAYER_URL} />
      {locations.map((location, idx) => (
        <Marker key={idx} position={[location.latitude, location.longitude]}>
          <Popup>{location.label}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
