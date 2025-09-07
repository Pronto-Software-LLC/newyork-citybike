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

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface StationType {
  id: string;
  name: string;
  orig_name: string;
  coordinates: Coordinates;
  num_docks_available: number;
  bikes: number;
  ebikes: number;
}

export interface FavStationType extends StationType {
  addedAt: number;
}

export interface HistStationType extends StationType {
  updatedAt: number;
}

export interface StationTypeProps {
  station: StationType;
}

export interface FavStationTypeProps {
  station: FavStationType;
}

export interface HistStationTypeProps {
  station: HistStationType;
}
