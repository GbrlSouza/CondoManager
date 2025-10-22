import type { LocationGeocodedAddress } from 'expo-location';

type Coords = { latitude: number; longitude: number };

export async function reverseGeocodeAsync({
  latitude,
  longitude,
}: Coords): Promise<LocationGeocodedAddress[]> {
  return [
    {
      city: 'Sample City',
      street: 'Main Street',
      district: 'Downtown',
      region: 'Sample State',
      postalCode: '12345',
      country: 'Sample Country',
      isoCountryCode: 'SC',
      name: `Location at ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
      streetNumber: '123',
      subregion: null,
      timezone: null,
      formattedAddress: null,
    },
  ];
}

const NativeLocation = require('expo-location/build') as Record<string, unknown>;

module.exports = {
  ...NativeLocation,
  reverseGeocodeAsync,
};

module.exports.default = module.exports;
