import WebMapView, * as WebMaps from '@teovilla/react-native-web-maps';
import React from 'react';

export const PROVIDER_GOOGLE = 'google';
export const PROVIDER_DEFAULT = undefined;

const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

const MapView = React.forwardRef((props, ref) => {
  return <WebMapView ref={ref} googleMapsApiKey={GOOGLE_MAPS_API_KEY} {...props} />;
});

Object.assign(MapView, {
  ...WebMaps,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
});

export const {
  Marker,
  Callout,
  Polyline,
  Polygon,
  Circle,
  Overlay,
  Heatmap,
  UrlTile,
  WMSTile,
  LocalTile,
} = WebMaps;

export default MapView;
