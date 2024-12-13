interface ReverseGeocodeResult {
  type: string;
  features: Features[];
  query: {
    lat: number;
    lon: number;
    plus_code: string;
  };
}

interface Features {
  type: string;
  properties: Properties;
  geometry: Geometry;
  bbox: number[];
}

interface Properties {
  datasource: DataSource;
  name: string;
  country: string;
  country_code: string;
  state: string;
  county: string;
  city: string;
  postcode: string;
  district: string;
  suburb: string;
  quarter: string;
  street: string;
  lon: number;
  lat: number;
  distance: number;
  result_type: string;
  formatted: string;
  address_line1: string;
  address_line2: string;
  timezone: Timezone;
  plus_code: string;
  rank: Rank;
  place_id: string;
}

interface DataSource {
  sourcename: string;
  attribition: string;
  license: string;
  url: string;
}

interface Timezone {
  name: string;
  offset_STD: string;
  offset_STD_seconds: number;
  offset_DST: string;
  offset_DST_seconds: number;
  abbreviation_STD: string;
  abbreviation_DST: string;
}

interface Rank {
  importance: number;
  popularity: number;
}

interface Geometry {
  typep: string;
  coordinates: number[];
}

type Coordinates = {
  latitude: number;
  longitude: number;
};

type PinPoint = {
  street: string;
  quarter: string;
  suburb: string;
  city: string;
  code: string;
  state: string;
  country: string;
};

export type { ReverseGeocodeResult, Coordinates, PinPoint, Properties };
