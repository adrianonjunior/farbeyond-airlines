import { branches, type Weather } from '@fbd/shared';

export interface WeatherProvider {
  getByRegion(region: string): Promise<Weather | null>;
}

const conditions: Record<string, Omit<Weather, 'region' | 'updatedAt' | 'synthetic'>> = {
  'north-america': {
    temperatureC: 18,
    condition: 'cloudy',
    windKmh: 14,
    visibilityKm: 12,
    alert: null,
  },
  'south-america': {
    temperatureC: 25,
    condition: 'sunny',
    windKmh: 9,
    visibilityKm: 16,
    alert: null,
  },
  europe: { temperatureC: 21, condition: 'sunny', windKmh: 11, visibilityKm: 18, alert: null },
  africa: { temperatureC: 23, condition: 'cloudy', windKmh: 16, visibilityKm: 13, alert: null },
  asia: {
    temperatureC: 29,
    condition: 'rainy',
    windKmh: 8,
    visibilityKm: 9,
    alert: 'Pancadas de chuva simuladas',
  },
  oceania: { temperatureC: 19, condition: 'sunny', windKmh: 12, visibilityKm: 15, alert: null },
  antarctica: {
    temperatureC: -18,
    condition: 'snowy',
    windKmh: 28,
    visibilityKm: 5,
    alert: 'Operação sazonal simulada',
  },
};

export class MockWeatherProvider implements WeatherProvider {
  async getByRegion(region: string): Promise<Weather | null> {
    if (!branches.some((branch) => branch.region === region)) return null;
    const record = conditions[region];
    if (!record) return null;
    return { ...record, region, updatedAt: new Date().toISOString(), synthetic: true };
  }
}
