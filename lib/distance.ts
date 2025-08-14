import convert from 'convert';
import * as turf from '@turf/turf';

function formatDistance(km: number) {
  const feet = convert(km, 'km').to('feet');
  return parseInt(feet) + ' ft';
}

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number | undefined,
  lon2: number | undefined
) {
  if (lat2 === undefined || lon2 === undefined) {
    return 'Unknown';
  }
  const from = turf.point([lon1, lat1]);
  const to = turf.point([lon2, lat2]);
  return formatDistance(turf.distance(from, to, { units: 'kilometers' }));
}

export function bearings(
  lat1: number,
  lon1: number,
  lat2: number | undefined,
  lon2: number | undefined
) {
  if (lat2 === undefined || lon2 === undefined) {
    return 'Unknown';
  }
  const from = turf.point([lon1, lat1]);
  const to = turf.point([lon2, lat2]);
  return turf.bearing(from, to);
}
