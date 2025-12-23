export type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type Location = {
  name: string;
  lat: number;
  lng: number;
  color?: string;
};

export function buildArcs(
  base: { lat: number; lng: number },
  list: Location[]
): Position[] {
  return list.map((p, i) => ({
    order: i,
    startLat: base.lat,
    startLng: base.lng,
    endLat: p.lat,
    endLng: p.lng,
    arcAlt: 0.25 + (i % 3) * 0.05,
    color: p.color ?? "#F26343",
  }));
}

// Base location (United States - Washington DC)
export const baseLocation: Location = {
  name: "United States",
  lat: 38.9072,
  lng: -77.0369,
  color: "#F26343",
};

// Visited locations
export const visitedLocations: Location[] = [
  { name: "Canada (Toronto)", lat: 43.65107, lng: -79.347015 },
  { name: "Indonesia (Jakarta)", lat: -6.200000, lng: 106.816666 },
  { name: "Malaysia (Kuala Lumpur)", lat: 3.139003, lng: 101.686855 },
  { name: "Singapore", lat: 1.352083, lng: 103.819839 },
  { name: "Thailand (Bangkok)", lat: 13.756331, lng: 100.501762 },
  { name: "China (Beijing)", lat: 39.9042, lng: 116.4074 },
  { name: "Australia (Sydney)", lat: -33.8688, lng: 151.2093 },
  { name: "United Kingdom (London)", lat: 51.5074, lng: -0.1278 },
  { name: "United Arab Emirates (Dubai)", lat: 25.2048, lng: 55.2708 },
  { name: "India (New Delhi)", lat: 28.6139, lng: 77.209 },
  { name: "Mexico (Mexico City)", lat: 19.4326, lng: -99.1332 },
];

// Countries for marquee
export const marqueeCountries = [
  "CANADA",
  "INDONESIA",
  "CHINA",
  "AUSTRALIA",
  "UNITED STATES",
  "MALAYSIA",
  "SINGAPORE",
  "THAILAND",
  "UNITED KINGDOM",
  "UNITED ARAB EMIRATES",
  "INDIA",
  "MEXICO",
];


