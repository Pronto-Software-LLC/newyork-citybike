export type SubscriptionPlan = {
  name: string;
  description: string;
  stripePriceId: string;
};

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};
export interface StationStatus {
  data: Data;
  last_updated: number;
  ttl: number;
  version: string;
}

export interface Data {
  stations: Station[];
}

export interface Station {
  num_bikes_disabled: number;
  is_renting: number;
  eightd_has_available_keys: boolean;
  station_id: string;
  is_installed: number;
  legacy_id: string;
  num_ebikes_available: number;
  last_reported: number;
  num_bikes_available: number;
  num_docks_available: number;
  num_docks_disabled: number;
  is_returning: number;
  num_scooters_available?: number;
  num_scooters_unavailable?: number;
}

export interface StationInformation {
  data: Data;
  last_updated: number;
  ttl: number;
  version: string;
}

export interface Data {
  stations: Station[];
}

export interface Station {
  name: string;
  rental_methods: RentalMethod[];
  rental_uris: RentalUris;
  region_id?: string;
  short_name: string;
  lat: number;
  external_id: string;
  eightd_station_services: unknown[];
  eightd_has_key_dispenser: boolean;
  electric_bike_surcharge_waiver: boolean;
  capacity: number;
  has_kiosk: boolean;
  station_id: string;
  lon: number;
  station_type: StationType;
}

export enum RentalMethod {
  Creditcard = 'CREDITCARD',
  Key = 'KEY',
}

export interface RentalUris {
  android: string;
  ios: string;
}

export enum StationType {
  Classic = 'classic',
}
