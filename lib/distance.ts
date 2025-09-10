// import convert from 'convert';
import configureMeasurements from '@/lib/convert-units';
import length from '@/lib/convert-units/definitions/length';

import * as turf from '@turf/turf';
// import { th } from 'date-fns/locale';

const convert = configureMeasurements({
  length,
});

export function formatDistanceImperial(km: number) {
  // const feet = convert(km)
  //   .from('km')
  //   .toBest({ exclude: ['nm','μm','mm','cm','m','km','in','yd','ft-us','ft','fathom','mi','nMi'] });
  const feet = convert(km)
    .from('km')
    .toBest({
      system: 'imperial',
      exclude: [
        'nm',
        'μm',
        'mm',
        'cm',
        'm',
        'km',
        'in',
        'yd',
        'ft-us',
        // 'ft',
        'fathom',
        // 'mi',
        'nMi',
      ],
    });
  if (!feet) return '0 ft';
  if (feet?.unit !== 'mi') {
    return parseInt(feet.val.toString()) + ' ' + feet.unit;
  }
  return Number(feet.val.toFixed(2)).toString() + ' ' + feet.unit;
}

export function formatDistanceMetric(km: number) {
  const theKm = convert(km)
    .from('km')
    .toBest({
      system: 'metric',
      exclude: [
        'nm',
        'μm',
        'mm',
        'cm',
        // 'm',
        // 'km',
        'in',
        'yd',
        'ft-us',
        'ft',
        'fathom',
        'mi',
        'nMi',
      ],
    });
  if (!theKm) return '0 ft';
  if (theKm?.unit !== 'km') {
    return parseInt(theKm.val.toString()) + ' ' + theKm.unit;
  }
  return Number(theKm.val.toFixed(2)).toString() + ' ' + theKm.unit;
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
