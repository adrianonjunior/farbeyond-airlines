import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { findRoute, findRoutes, type Language, type Route, type Weather } from '@fbd/shared';

export function useFlightSearch(
  initialFrom: string,
  initialTo: string,
  initialDate: string,
  initialPassengers: number,
  language: Language,
) {
  const navigate = useNavigate();
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [date, setDate] = useState(initialDate);
  const [passengers, setPassengers] = useState(initialPassengers);
  const [error, setError] = useState('');

  function submit(event: FormEvent) {
    event.preventDefault();
    if (from === to) {
      setError(language === 'pt' ? 'Escolha destinos diferentes.' : 'Choose different airports.');
      return;
    }
    setError('');
    navigate(`/flights?from=${from}&to=${to}&date=${date}&passengers=${passengers}`);
  }

  return { from, setFrom, to, setTo, date, setDate, passengers, setPassengers, error, submit };
}

export function useRouteData(id?: string): Route | undefined {
  return id ? findRoute(id) : undefined;
}

export function useFlightFilters(
  from: string,
  to: string,
  maxPrice: number,
  directOnly: boolean,
): Route[] {
  return findRoutes(from || undefined, to || undefined).filter(
    (route) => route.priceBRL <= maxPrice && (!directOnly || route.stops === 0),
  );
}

type WeatherState =
  | { status: 'loading' }
  | { status: 'ready'; data: Weather }
  | { status: 'empty' }
  | { status: 'error' };

export function useWeather(region: string): WeatherState {
  const [state, setState] = useState<{ region: string; result: WeatherState }>({
    region,
    result: { status: 'loading' },
  });
  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/weather/${encodeURIComponent(region)}`, { signal: controller.signal })
      .then((response) => {
        if (response.status === 404) return null;
        if (!response.ok) throw new Error('Weather unavailable');
        return response.json() as Promise<{ data: Weather }>;
      })
      .then((result) =>
        setState({
          region,
          result: result ? { status: 'ready', data: result.data } : { status: 'empty' },
        }),
      )
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === 'AbortError'))
          setState({ region, result: { status: 'error' } });
      });
    return () => controller.abort();
  }, [region]);
  return state.region === region ? state.result : { status: 'loading' };
}
