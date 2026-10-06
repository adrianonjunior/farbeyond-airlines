import cors from 'cors';
import express from 'express';
import { branches, findRoute, findRoutes, makeQuote, routes, type Currency } from '@fbd/shared';
import { MockWeatherProvider } from './weather.js';

const app = express();
const weatherProvider = new MockWeatherProvider();
const port = Number(process.env.PORT || 3001);

app.use(cors({ origin: ['http://127.0.0.1:5173', 'http://localhost:5173'] }));
app.use(express.json({ limit: '16kb' }));

app.get('/api/branches', (_request, response) =>
  response.json({ data: branches, synthetic: true }),
);

app.get('/api/routes', (request, response) => {
  const from =
    typeof request.query.from === 'string' ? request.query.from.toUpperCase() : undefined;
  const to = typeof request.query.to === 'string' ? request.query.to.toUpperCase() : undefined;
  response.json({ data: findRoutes(from, to), synthetic: true });
});

app.post('/api/routes/estimate', (request, response) => {
  const { routeId, passengers = 1, currency = 'BRL' } = request.body ?? {};
  const route = typeof routeId === 'string' ? findRoute(routeId) : undefined;
  if (
    !route ||
    !Number.isInteger(passengers) ||
    passengers < 1 ||
    passengers > 8 ||
    !['BRL', 'USD'].includes(currency)
  ) {
    response.status(400).json({ error: 'Invalid route, passenger count or currency.' });
    return;
  }
  response.json({
    data: makeQuote(route, passengers, false, 'standard', currency as Currency),
    synthetic: true,
  });
});

app.get('/api/weather/:region', async (request, response) => {
  const region = String(request.params.region);
  try {
    const weather = await weatherProvider.getByRegion(region);
    if (!weather) {
      response.status(404).json({ error: 'No synthetic weather data for this region.' });
      return;
    }
    response.json({ data: weather });
  } catch {
    response.status(503).json({ error: 'Weather unavailable. Please try again.' });
  }
});

app.get('/api/analytics/spending', (_request, response) => {
  const average = Math.round(
    routes.reduce((total, route) => total + route.priceBRL, 0) / routes.length,
  );
  response.json({
    data: {
      currency: 'BRL',
      averageFare: average,
      routeCount: routes.length,
      comparison: routes.map((route) => ({ routeId: route.id, price: route.priceBRL })),
    },
    synthetic: true,
  });
});

app.post('/api/checkout/quote', (request, response) => {
  const {
    routeId,
    passengers = 1,
    baggage = false,
    seat = 'standard',
    currency = 'BRL',
  } = request.body ?? {};
  const route = typeof routeId === 'string' ? findRoute(routeId) : undefined;
  if (
    !route ||
    !Number.isInteger(passengers) ||
    passengers < 1 ||
    passengers > 8 ||
    typeof baggage !== 'boolean' ||
    !['standard', 'extra'].includes(seat) ||
    !['BRL', 'USD'].includes(currency)
  ) {
    response.status(400).json({ error: 'Invalid quote options.' });
    return;
  }
  response.json({
    data: makeQuote(route, passengers, baggage, seat, currency as Currency),
    synthetic: true,
  });
});

app.listen(port, () => {
  process.stdout.write(`FBD API listening on http://127.0.0.1:${port}\n`);
});
