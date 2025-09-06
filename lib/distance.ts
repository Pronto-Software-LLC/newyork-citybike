import convert from 'convert';
import * as turf from '@turf/turf';

export function formatDistanceImperial(km: number) {
  const feet = convert(km, 'km').to('best', 'imperial');
  if (feet.unit !== 'mi') {
    return parseInt(feet.toString()) + ' ' + feet.unit;
  }
  return Number(feet.quantity.toFixed(2)).toString() + ' ' + feet.unit;
}

export function formatDistanceMetric(km: number) {
  const theKm = convert(km, 'km').to('best', 'metric');
  if (theKm.unit !== 'km') {
    return parseInt(theKm.toString()) + ' ' + theKm.unit;
  }
  return Number(theKm.quantity.toFixed(2)).toString() + ' ' + theKm.unit;
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
  return turf.distance(from, to, { units: 'kilometers' });
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
