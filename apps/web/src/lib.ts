import { convertCurrency, type Branch, type Currency, type Language } from '@fbd/shared';

const citiesEN: Record<string, string> = {
  JFK: 'New York',
  LIS: 'Lisbon',
  CPT: 'Cape Town',
  SIN: 'Singapore',
  MCM: 'Meridian Base',
};

const continentsEN: Record<string, string> = {
  'América do Norte': 'North America',
  'América do Sul': 'South America',
  Europa: 'Europe',
  África: 'Africa',
  Ásia: 'Asia',
  Oceania: 'Oceania',
  Antártida: 'Antarctica',
};

const countriesEN: Record<string, string> = {
  'Estados Unidos': 'United States',
  Brasil: 'Brazil',
  Portugal: 'Portugal',
  'África do Sul': 'South Africa',
  Singapura: 'Singapore',
  Austrália: 'Australia',
  Antártida: 'Antarctica',
};

export function cityLabel(branch: Branch, language: Language): string {
  return language === 'en' ? (citiesEN[branch.code] ?? branch.city) : branch.city;
}

export function continentLabel(continent: string, language: Language): string {
  return language === 'en' ? (continentsEN[continent] ?? continent) : continent;
}

export function countryLabel(country: string, language: Language): string {
  return language === 'en' ? (countriesEN[country] ?? country) : country;
}

export function money(valueBRL: number, currency: Currency, language: Language): string {
  return new Intl.NumberFormat(language === 'pt' ? 'pt-BR' : 'en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(convertCurrency(valueBRL, currency));
}

export function dateLabel(value: string, language: Language): string {
  if (!value) return '';
  const [year, month, day] = value.split('-').map(Number);
  return new Intl.DateTimeFormat(language === 'pt' ? 'pt-BR' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(year ?? 2026, (month ?? 1) - 1, day ?? 1));
}

export function futureDate(days = 21): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export const content = {
  pt: {
    nav: { home: 'Início', explore: 'Explorar mundo', flights: 'Voos', checkout: 'Sua reserva' },
    demo: 'Experiência demonstrativa · Nenhuma cobrança real',
    search: 'Buscar voos',
    origin: 'Origem',
    destination: 'Destino',
    date: 'Data da viagem',
    passengers: 'Passageiros',
    from: 'A partir de',
    details: 'Ver detalhes',
    select: 'Selecionar voo',
    synthetic: 'Dados de demonstração',
  },
  en: {
    nav: { home: 'Home', explore: 'Explore world', flights: 'Flights', checkout: 'Your booking' },
    demo: 'Demo experience · No real charges',
    search: 'Search flights',
    origin: 'From',
    destination: 'To',
    date: 'Travel date',
    passengers: 'Passengers',
    from: 'From',
    details: 'View details',
    select: 'Select flight',
    synthetic: 'Demonstration data',
  },
} as const;
