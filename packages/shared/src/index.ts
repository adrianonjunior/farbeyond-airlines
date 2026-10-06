export type Currency = 'BRL' | 'USD';
export type Language = 'pt' | 'en';

export type Branch = {
  code: string;
  city: string;
  country: string;
  continent: string;
  region: string;
  latitude: number;
  longitude: number;
  timezone: string;
  seasonal?: boolean;
};

export type Route = {
  id: string;
  from: string;
  to: string;
  durationMinutes: number;
  stops: number;
  departure: string;
  arrival: string;
  priceBRL: number;
  aircraft: string;
};

export type Weather = {
  region: string;
  temperatureC: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy';
  windKmh: number;
  visibilityKm: number;
  alert: string | null;
  updatedAt: string;
  synthetic: true;
};

export type Quote = {
  routeId: string;
  passengers: number;
  baggage: boolean;
  seat: 'standard' | 'extra';
  currency: Currency;
  fare: number;
  taxes: number;
  extras: number;
  total: number;
};

export const branches: Branch[] = [
  {
    code: 'JFK',
    city: 'Nova York',
    country: 'Estados Unidos',
    continent: 'América do Norte',
    region: 'north-america',
    latitude: 40.6413,
    longitude: -73.7781,
    timezone: 'America/New_York',
  },
  {
    code: 'GRU',
    city: 'São Paulo',
    country: 'Brasil',
    continent: 'América do Sul',
    region: 'south-america',
    latitude: -23.4356,
    longitude: -46.4731,
    timezone: 'America/Sao_Paulo',
  },
  {
    code: 'LIS',
    city: 'Lisboa',
    country: 'Portugal',
    continent: 'Europa',
    region: 'europe',
    latitude: 38.7742,
    longitude: -9.1342,
    timezone: 'Europe/Lisbon',
  },
  {
    code: 'CPT',
    city: 'Cidade do Cabo',
    country: 'África do Sul',
    continent: 'África',
    region: 'africa',
    latitude: -33.9715,
    longitude: 18.6021,
    timezone: 'Africa/Johannesburg',
  },
  {
    code: 'SIN',
    city: 'Singapura',
    country: 'Singapura',
    continent: 'Ásia',
    region: 'asia',
    latitude: 1.3644,
    longitude: 103.9915,
    timezone: 'Asia/Singapore',
  },
  {
    code: 'SYD',
    city: 'Sydney',
    country: 'Austrália',
    continent: 'Oceania',
    region: 'oceania',
    latitude: -33.9399,
    longitude: 151.1753,
    timezone: 'Australia/Sydney',
  },
  {
    code: 'MCM',
    city: 'Base Meridian',
    country: 'Antártida',
    continent: 'Antártida',
    region: 'antarctica',
    latitude: -77.846,
    longitude: 166.668,
    timezone: 'Antarctica/McMurdo',
    seasonal: true,
  },
];

export const routes: Route[] = [
  {
    id: 'fbd-101',
    from: 'GRU',
    to: 'LIS',
    durationMinutes: 600,
    stops: 0,
    departure: '22:40',
    arrival: '10:40',
    priceBRL: 3890,
    aircraft: 'Airbus A350',
  },
  {
    id: 'fbd-102',
    from: 'GRU',
    to: 'JFK',
    durationMinutes: 590,
    stops: 0,
    departure: '20:10',
    arrival: '05:00',
    priceBRL: 4320,
    aircraft: 'Boeing 787',
  },
  {
    id: 'fbd-103',
    from: 'JFK',
    to: 'LIS',
    durationMinutes: 420,
    stops: 0,
    departure: '23:15',
    arrival: '11:15',
    priceBRL: 3560,
    aircraft: 'Airbus A330neo',
  },
  {
    id: 'fbd-104',
    from: 'LIS',
    to: 'CPT',
    durationMinutes: 710,
    stops: 0,
    departure: '09:20',
    arrival: '21:10',
    priceBRL: 4690,
    aircraft: 'Airbus A350',
  },
  {
    id: 'fbd-105',
    from: 'LIS',
    to: 'SIN',
    durationMinutes: 770,
    stops: 0,
    departure: '13:30',
    arrival: '09:20',
    priceBRL: 5980,
    aircraft: 'Boeing 787',
  },
  {
    id: 'fbd-106',
    from: 'CPT',
    to: 'SIN',
    durationMinutes: 665,
    stops: 0,
    departure: '18:15',
    arrival: '12:20',
    priceBRL: 5420,
    aircraft: 'Airbus A350',
  },
  {
    id: 'fbd-107',
    from: 'SIN',
    to: 'SYD',
    durationMinutes: 475,
    stops: 0,
    departure: '08:00',
    arrival: '18:55',
    priceBRL: 3290,
    aircraft: 'Boeing 787',
  },
  {
    id: 'fbd-108',
    from: 'SYD',
    to: 'MCM',
    durationMinutes: 360,
    stops: 0,
    departure: '07:30',
    arrival: '14:30',
    priceBRL: 6890,
    aircraft: 'Airbus A321XLR',
  },
  {
    id: 'fbd-109',
    from: 'CPT',
    to: 'MCM',
    durationMinutes: 640,
    stops: 1,
    departure: '06:50',
    arrival: '18:30',
    priceBRL: 7790,
    aircraft: 'Airbus A321XLR',
  },
  {
    id: 'fbd-110',
    from: 'JFK',
    to: 'SYD',
    durationMinutes: 1320,
    stops: 1,
    departure: '17:40',
    arrival: '06:40',
    priceBRL: 8240,
    aircraft: 'Airbus A350',
  },
  {
    id: 'fbd-111',
    from: 'GRU',
    to: 'CPT',
    durationMinutes: 525,
    stops: 0,
    departure: '11:25',
    arrival: '22:10',
    priceBRL: 4010,
    aircraft: 'Boeing 787',
  },
  {
    id: 'fbd-112',
    from: 'LIS',
    to: 'SYD',
    durationMinutes: 1270,
    stops: 1,
    departure: '16:00',
    arrival: '15:10',
    priceBRL: 7460,
    aircraft: 'Airbus A350',
  },
];

export const exchangeRate = 5.2;

export function findBranch(code: string): Branch | undefined {
  return branches.find((branch) => branch.code === code);
}

export function findRoute(id: string): Route | undefined {
  return routes.find((route) => route.id === id);
}

export function findRoutes(from?: string, to?: string): Route[] {
  return routes.filter((route) => {
    if (!from && !to) return true;
    return (!from || route.from === from) && (!to || route.to === to);
  });
}

export function convertCurrency(valueBRL: number, currency: Currency): number {
  return Math.round(currency === 'BRL' ? valueBRL : valueBRL / exchangeRate);
}

export function makeQuote(
  route: Route,
  passengers: number,
  baggage: boolean,
  seat: 'standard' | 'extra',
  currency: Currency,
): Quote {
  const fareBRL = route.priceBRL * passengers;
  const taxesBRL = Math.round(fareBRL * 0.12);
  const extrasBRL = passengers * ((baggage ? 180 : 0) + (seat === 'extra' ? 140 : 0));
  const fare = convertCurrency(fareBRL, currency);
  const taxes = convertCurrency(taxesBRL, currency);
  const extras = convertCurrency(extrasBRL, currency);
  return {
    routeId: route.id,
    passengers,
    baggage,
    seat,
    currency,
    fare,
    taxes,
    extras,
    total: fare + taxes + extras,
  };
}

export function durationLabel(minutes: number): string {
  return `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, '0')}m`;
}
