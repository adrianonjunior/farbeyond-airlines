import { useState, type FormEvent, type ReactNode } from 'react';
import {
  Link,
  NavLink,
  Route as RouterRoute,
  Routes,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BaggageClaim,
  CalendarDays,
  Check,
  ChevronDown,
  CloudRain,
  CloudSun,
  Compass,
  CreditCard,
  Globe2,
  MapPin,
  Menu,
  MoveRight,
  Plane,
  Search,
  ShieldCheck,
  Snowflake,
  Sun,
  Wind,
} from 'lucide-react';
import {
  branches,
  durationLabel,
  findBranch,
  findRoute,
  makeQuote,
  routes,
  type Branch,
  type Currency,
  type Language,
  type Route,
} from '@fbd/shared';
import Globe from './Globe';
import { useFlightFilters, useFlightSearch, useRouteData, useWeather } from './hooks';
import {
  cityLabel,
  content,
  continentLabel,
  countryLabel,
  dateLabel,
  futureDate,
  money,
} from './lib';

type Preferences = { language: Language; currency: Currency };

function App() {
  const [language, setLanguage] = useState<Language>('pt');
  const [currency, setCurrency] = useState<Currency>('BRL');
  const prefs = { language, currency };
  const t = content[language];

  return (
    <>
      <div className="topline">
        <span>{t.demo}</span>
        <span>FBD · GLOBAL NETWORK</span>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Link className="brand" to="/" aria-label="FarBeyond Airlines — início">
            <img src="/brand/logo.svg" alt="FarBeyond Airlines" />
          </Link>
          <nav
            className="main-nav"
            aria-label={language === 'pt' ? 'Navegação principal' : 'Main navigation'}
          >
            <NavLink to="/" end>
              {t.nav.home}
            </NavLink>
            <NavLink to="/explore">{t.nav.explore}</NavLink>
            <NavLink to="/flights">{t.nav.flights}</NavLink>
          </nav>
          <div className="header-actions">
            <label className="select-simple">
              <span className="sr-only">{language === 'pt' ? 'Idioma' : 'Language'}</span>
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value as Language)}
              >
                <option value="pt">PT</option>
                <option value="en">EN</option>
              </select>
              <ChevronDown size={12} />
            </label>
            <label className="select-simple">
              <span className="sr-only">{language === 'pt' ? 'Moeda' : 'Currency'}</span>
              <select
                value={currency}
                onChange={(event) => setCurrency(event.target.value as Currency)}
              >
                <option value="BRL">BRL</option>
                <option value="USD">USD</option>
              </select>
              <ChevronDown size={12} />
            </label>
            <Link className="header-book" to="/flights">
              {t.search}
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </header>
      <main>
        <Routes>
          <RouterRoute path="/" element={<Home prefs={prefs} />} />
          <RouterRoute path="/explore" element={<Explore prefs={prefs} />} />
          <RouterRoute path="/flights" element={<Flights prefs={prefs} />} />
          <RouterRoute path="/trip/:id" element={<Trip prefs={prefs} />} />
          <RouterRoute path="/checkout" element={<Checkout prefs={prefs} />} />
          <RouterRoute path="/insights" element={<Insights prefs={prefs} />} />
          <RouterRoute path="*" element={<NotFound prefs={prefs} />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="container footer-main">
          <div>
            <img src="/brand/logo-light.svg" alt="FarBeyond Airlines" />
            <p>
              {language === 'pt'
                ? 'O mundo é maior quando você vai além.'
                : 'The world is bigger when you go beyond.'}
            </p>
          </div>
          <div className="footer-links">
            <Link to="/explore">{t.nav.explore}</Link>
            <Link to="/flights">{t.nav.flights}</Link>
            <Link to="/insights">{language === 'pt' ? 'Análises' : 'Insights'}</Link>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} FarBeyond Airlines · FBD</span>
          <span>
            {language === 'pt'
              ? 'Projeto fictício. Sem venda ou cobrança real.'
              : 'Fictional project. No real sale or charge.'}
          </span>
        </div>
      </footer>
    </>
  );
}

function DemoTag({ language }: { language: Language }) {
  return (
    <span className="demo-tag">
      <span className="demo-dot" />
      {content[language].synthetic}
    </span>
  );
}

function SectionHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}

function SearchForm({
  prefs,
  initialFrom = 'GRU',
  initialTo = 'LIS',
  initialDate = futureDate(),
  initialPassengers = 1,
  compact = false,
}: {
  prefs: Preferences;
  initialFrom?: string;
  initialTo?: string;
  initialDate?: string;
  initialPassengers?: number;
  compact?: boolean;
}) {
  const { from, setFrom, to, setTo, date, setDate, passengers, setPassengers, error, submit } =
    useFlightSearch(initialFrom, initialTo, initialDate, initialPassengers, prefs.language);
  const t = content[prefs.language];

  return (
    <form className={`search-form ${compact ? 'search-form-compact' : ''}`} onSubmit={submit}>
      <div className="search-grid">
        <label className="search-field">
          <span>
            <MapPin size={15} />
            {t.origin}
          </span>
          <select value={from} onChange={(event) => setFrom(event.target.value)}>
            {branches.map((branch) => (
              <option key={branch.code} value={branch.code}>
                {cityLabel(branch, prefs.language)} ({branch.code})
              </option>
            ))}
          </select>
        </label>
        <label className="search-field">
          <span>
            <Plane size={15} />
            {t.destination}
          </span>
          <select value={to} onChange={(event) => setTo(event.target.value)}>
            {branches.map((branch) => (
              <option key={branch.code} value={branch.code}>
                {cityLabel(branch, prefs.language)} ({branch.code})
              </option>
            ))}
          </select>
        </label>
        <label className="search-field">
          <span>
            <CalendarDays size={15} />
            {t.date}
          </span>
          <input
            type="date"
            min={futureDate(0)}
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </label>
        <label className="search-field search-passengers">
          <span>
            <Menu size={15} />
            {t.passengers}
          </span>
          <select
            value={passengers}
            onChange={(event) => setPassengers(Number(event.target.value))}
          >
            {Array.from({ length: 8 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </label>
        <button className="button button-gold search-button" type="submit">
          <Search size={18} />
          {t.search}
          <ArrowRight size={16} />
        </button>
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

function Home({ prefs }: { prefs: Preferences }) {
  const pt = prefs.language === 'pt';
  const featured = [routes[0], routes[10], routes[6]].filter((route): route is Route =>
    Boolean(route),
  );
  return (
    <>
      <section className="hero">
        <div className="hero-image" />
        <div className="hero-shade" />
        <div className="container hero-content">
          <div className="hero-copy">
            <h1>
              {pt ? (
                <>
                  Seu próximo destino começa <em>além.</em>
                </>
              ) : (
                <>
                  Your next destination begins <em>beyond.</em>
                </>
              )}
            </h1>
            <p>
              {pt
                ? 'Conecte continentes, descubra novos horizontes e planeje sua próxima história pelo mundo.'
                : 'Connect continents, discover new horizons and plan your next story around the world.'}
            </p>
            <Link className="hero-explore" to="/explore">
              {pt ? 'Conheça nossa rede global' : 'Discover our global network'}
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <div className="container search-overlap">
        <div className="search-panel">
          <div className="search-panel-head">
            <div>
              <h2>{pt ? 'Para onde vamos?' : 'Where to next?'}</h2>
              <p>
                {pt
                  ? 'Encontre a rota certa para sua próxima jornada.'
                  : 'Find the right route for your next journey.'}
              </p>
            </div>
            <DemoTag language={prefs.language} />
          </div>
          <SearchForm prefs={prefs} />
        </div>
      </div>
      <section className="section container destinations">
        <SectionHeading
          title={pt ? 'Um mundo de possibilidades' : 'A world of possibilities'}
          description={
            pt
              ? 'Explore alguns dos destinos que fazem parte da nossa rede.'
              : 'Explore a few destinations across our network.'
          }
          action={
            <Link className="text-link" to="/explore">
              {pt ? 'Explorar todos os destinos' : 'Explore all destinations'}
              <ArrowUpRight size={18} />
            </Link>
          }
        />
        <div className="destination-grid">
          {featured.map((route, index) => {
            const destination = findBranch(route.to)!;
            return (
              <Link
                className={`destination-tile destination-${index}`}
                key={route.id}
                to={`/trip/${route.id}`}
              >
                <span className="destination-top">
                  <span>{continentLabel(destination.continent, prefs.language)}</span>
                  <ArrowUpRight size={18} />
                </span>
                <span className="destination-bottom">
                  <strong>{cityLabel(destination, prefs.language)}</strong>
                  <small>
                    {route.from} <MoveRight size={15} /> {route.to}
                  </small>
                  <span>
                    {content[prefs.language].from}{' '}
                    {money(route.priceBRL, prefs.currency, prefs.language)}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="network-band">
        <div className="container network-layout">
          <div className="network-copy">
            <h2>
              {pt ? (
                <>
                  O mundo ao seu alcance. <i>De verdade.</i>
                </>
              ) : (
                <>
                  The world within reach. <i>Truly.</i>
                </>
              )}
            </h2>
            <p>
              {pt
                ? 'De São Paulo a Singapura, nossa rede fictícia atravessa sete continentes e abre novas formas de imaginar a viagem.'
                : 'From São Paulo to Singapore, our fictional network spans seven continents and opens new ways to imagine travel.'}
            </p>
            <div className="network-stats">
              <div>
                <strong>07</strong>
                <span>{pt ? 'filiais globais' : 'global branches'}</span>
              </div>
              <div>
                <strong>12</strong>
                <span>{pt ? 'rotas demonstrativas' : 'demo routes'}</span>
              </div>
            </div>
            <Link className="button button-outline-light" to="/explore">
              {pt ? 'Explorar o globo' : 'Explore the globe'}
              <ArrowRight size={17} />
            </Link>
          </div>
          <div className="network-orbit" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="orbit-core">
              <img src="/brand/logo-mark.svg" alt="" />
            </div>
            <span className="orbit-label orbit-gru">GRU</span>
            <span className="orbit-label orbit-lis">LIS</span>
            <span className="orbit-label orbit-sin">SIN</span>
          </div>
        </div>
      </section>
      <section className="section container home-note">
        <div>
          <ShieldCheck size={31} />
          <h2>{pt ? 'Explore com tranquilidade' : 'Explore with confidence'}</h2>
          <p>
            {pt
              ? 'Esta é uma experiência de demonstração. Voos, preços e clima são fictícios, e nenhuma compra gera cobrança.'
              : 'This is a demonstration. Flights, prices and weather are fictional, and no booking creates a charge.'}
          </p>
        </div>
        <Link className="text-link" to="/flights">
          {pt ? 'Ver voos disponíveis' : 'See available flights'}
          <ArrowRight size={17} />
        </Link>
      </section>
    </>
  );
}

function RouteLine({
  route,
  prefs,
  passengers = 1,
  date = futureDate(),
}: {
  route: Route;
  prefs: Preferences;
  passengers?: number;
  date?: string;
}) {
  const pt = prefs.language === 'pt';
  const from = findBranch(route.from)!;
  const to = findBranch(route.to)!;
  return (
    <article className="flight-row">
      <div className="flight-id">
        <span>FBD {route.id.split('-')[1]}</span>
        <span>{route.aircraft}</span>
      </div>
      <div className="flight-main">
        <div className="airport-point">
          <strong>{route.departure}</strong>
          <span>{from.code}</span>
          <small>{cityLabel(from, prefs.language)}</small>
        </div>
        <div className="flight-journey">
          <span>{durationLabel(route.durationMinutes)}</span>
          <div className="journey-line">
            <Plane size={18} />
          </div>
          <small>
            {route.stops === 0 ? (pt ? 'Direto' : 'Direct') : pt ? '1 escala' : '1 stop'}
          </small>
        </div>
        <div className="airport-point">
          <strong>{route.arrival}</strong>
          <span>{to.code}</span>
          <small>{cityLabel(to, prefs.language)}</small>
        </div>
      </div>
      <div className="flight-price">
        <small>{pt ? 'por passageiro' : 'per passenger'}</small>
        <strong>{money(route.priceBRL, prefs.currency, prefs.language)}</strong>
        <Link
          className="button button-navy"
          to={`/trip/${route.id}?date=${date}&passengers=${passengers}`}
        >
          {content[prefs.language].details}
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}

function Flights({ prefs }: { prefs: Preferences }) {
  const [params] = useSearchParams();
  const pt = prefs.language === 'pt';
  const from = params.get('from') || '';
  const to = params.get('to') || '';
  const date = params.get('date') || futureDate();
  const passengers = Math.min(8, Math.max(1, Number(params.get('passengers')) || 1));
  const [maxPrice, setMaxPrice] = useState(9000);
  const [directOnly, setDirectOnly] = useState(false);
  const filtered = useFlightFilters(from, to, maxPrice, directOnly);
  const heading =
    from && to
      ? `${findBranch(from) ? cityLabel(findBranch(from)!, prefs.language) : from} → ${findBranch(to) ? cityLabel(findBranch(to)!, prefs.language) : to}`
      : pt
        ? 'Encontre seu próximo voo'
        : 'Find your next flight';
  return (
    <>
      <div className="page-intro container">
        <div>
          <p className="breadcrumb">
            <Link to="/">{pt ? 'Início' : 'Home'}</Link> / {pt ? 'Voos' : 'Flights'}
          </p>
          <h1>{heading}</h1>
          <p>
            {from && to
              ? `${dateLabel(date, prefs.language)} · ${passengers} ${pt ? 'passageiro(s)' : 'passenger(s)'}`
              : pt
                ? 'Compare rotas e escolha o próximo destino.'
                : 'Compare routes and choose your next destination.'}
          </p>
        </div>
        <DemoTag language={prefs.language} />
      </div>
      <div className="container results-search">
        <SearchForm
          key={`${from}-${to}-${date}-${passengers}`}
          prefs={prefs}
          initialFrom={from || 'GRU'}
          initialTo={to || 'LIS'}
          initialDate={date}
          initialPassengers={passengers}
          compact
        />
      </div>
      <div className="container results-layout">
        <aside className="filters">
          <div className="filters-title">
            <h2>{pt ? 'Filtros' : 'Filters'}</h2>
            <span>
              {filtered.length} {pt ? 'voos' : 'flights'}
            </span>
          </div>
          <label className="range-label">
            <span>{pt ? 'Preço máximo' : 'Maximum price'}</span>
            <strong>{money(maxPrice, prefs.currency, prefs.language)}</strong>
            <input
              type="range"
              min="3000"
              max="9000"
              step="250"
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
            />
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={directOnly}
              onChange={(event) => setDirectOnly(event.target.checked)}
            />
            <span>{pt ? 'Somente voos diretos' : 'Direct flights only'}</span>
          </label>
          <div className="filters-foot">
            <Compass size={19} />
            <p>
              {pt
                ? 'Todas as rotas e tarifas são ilustrativas.'
                : 'All routes and fares are illustrative.'}
            </p>
          </div>
        </aside>
        <div className="results-list">
          <div className="results-head">
            <h2>
              {filtered.length} {pt ? 'opções de voo' : 'flight options'}
            </h2>
            <span>{pt ? 'Ordenado por preço estimado' : 'Sorted by estimated price'}</span>
          </div>
          {filtered.length ? (
            [...filtered]
              .sort((a, b) => a.priceBRL - b.priceBRL)
              .map((route) => (
                <RouteLine
                  key={route.id}
                  route={route}
                  prefs={prefs}
                  passengers={passengers}
                  date={date}
                />
              ))
          ) : (
            <div className="empty-state">
              <Search size={28} />
              <h3>{pt ? 'Nenhuma rota encontrada' : 'No routes found'}</h3>
              <p>
                {pt
                  ? 'Tente outra origem, destino ou ajuste os filtros. Nossa rede demonstrativa tem 12 rotas.'
                  : 'Try another origin or destination, or change the filters. Our demo network has 12 routes.'}
              </p>
              <button
                className="text-link"
                type="button"
                onClick={() => {
                  setMaxPrice(9000);
                  setDirectOnly(false);
                }}
              >
                {pt ? 'Limpar filtros' : 'Clear filters'}
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function WeatherCard({
  branch,
  prefs,
  region = false,
}: {
  branch: Branch;
  prefs: Preferences;
  region?: boolean;
}) {
  const weather = useWeather(branch.region);
  const pt = prefs.language === 'pt';
  const conditionLabels = {
    sunny: pt ? 'Ensolarado' : 'Sunny',
    cloudy: pt ? 'Parcialmente nublado' : 'Partly cloudy',
    rainy: pt ? 'Chuva' : 'Rain',
    snowy: pt ? 'Neve' : 'Snow',
  };
  return (
    <section className="weather-card">
      <div className="weather-head">
        <div>
          <h3>
            {region
              ? pt
                ? 'Clima da região'
                : 'Regional weather'
              : pt
                ? 'Clima no destino'
                : 'Destination weather'}
          </h3>
          <span>{cityLabel(branch, prefs.language)}</span>
        </div>
        <DemoTag language={prefs.language} />
      </div>
      {weather.status === 'loading' ? (
        <div className="weather-state" role="status">
          {pt ? 'Carregando clima sintético…' : 'Loading synthetic weather…'}
        </div>
      ) : weather.status === 'error' ? (
        <div className="weather-state" role="alert">
          {pt
            ? 'Clima indisponível. Inicie a API local e atualize a página.'
            : 'Weather unavailable. Start the local API and refresh.'}
        </div>
      ) : weather.status === 'empty' ? (
        <div className="weather-state">
          {pt ? 'Sem dados para esta região.' : 'No data for this region.'}
        </div>
      ) : (
        <>
          <div className="weather-current">
            {weather.data.condition === 'rainy' ? (
              <CloudRain size={42} strokeWidth={1.4} />
            ) : weather.data.condition === 'snowy' ? (
              <Snowflake size={42} strokeWidth={1.4} />
            ) : weather.data.condition === 'sunny' ? (
              <Sun size={42} strokeWidth={1.4} />
            ) : (
              <CloudSun size={42} strokeWidth={1.4} />
            )}
            <div>
              <strong>{weather.data.temperatureC}°C</strong>
              <span>{conditionLabels[weather.data.condition]}</span>
            </div>
          </div>
          <div className="weather-facts">
            <span>
              <Wind size={16} />
              {weather.data.windKmh} km/h {pt ? 'vento' : 'wind'}
            </span>
            <span>
              <Sun size={16} />
              {weather.data.visibilityKm} km {pt ? 'visibilidade' : 'visibility'}
            </span>
          </div>
          {weather.data.alert && (
            <p className="weather-alert">
              {pt
                ? weather.data.alert
                : branch.region === 'antarctica'
                  ? 'Simulated seasonal operation'
                  : 'Simulated rain showers'}
            </p>
          )}
          <p className="updated">
            {pt ? 'Atualizado' : 'Updated'}{' '}
            {new Intl.DateTimeFormat(pt ? 'pt-BR' : 'en-US', {
              hour: '2-digit',
              minute: '2-digit',
              timeZone: branch.timezone,
            }).format(new Date(weather.data.updatedAt))}{' '}
            · {branch.timezone}
          </p>
        </>
      )}
    </section>
  );
}

function Explore({ prefs }: { prefs: Preferences }) {
  const pt = prefs.language === 'pt';
  const [continent, setContinent] = useState('all');
  const [selectedCode, setSelectedCode] = useState('GRU');
  const [selectedRouteId, setSelectedRouteId] = useState('fbd-101');
  const selectedBranch = findBranch(selectedCode)!;
  const availableRoutes = routes.filter(
    (route) => route.from === selectedCode || route.to === selectedCode,
  );
  const selectedRoute =
    availableRoutes.find((route) => route.id === selectedRouteId) ?? availableRoutes[0];
  const filteredBranches =
    continent === 'all' ? branches : branches.filter((branch) => branch.continent === continent);

  function selectBranch(branch: Branch) {
    setSelectedCode(branch.code);
    const first = routes.find((route) => route.from === branch.code || route.to === branch.code);
    if (first) setSelectedRouteId(first.id);
  }

  return (
    <>
      <div className="explore-intro">
        <div className="container">
          <p className="breadcrumb">
            <Link to="/">{pt ? 'Início' : 'Home'}</Link> / {pt ? 'Explorar mundo' : 'Explore world'}
          </p>
          <div className="explore-title">
            <div>
              <h1>
                {pt ? (
                  <>
                    Explore o mundo <em>sem limites.</em>
                  </>
                ) : (
                  <>
                    Explore the world <em>without limits.</em>
                  </>
                )}
              </h1>
              <p>
                {pt
                  ? 'Gire o globo, descubra nossas filiais e acompanhe as rotas que conectam continentes.'
                  : 'Spin the globe, discover our branches and follow the routes connecting continents.'}
              </p>
            </div>
            <div className="explore-count">
              <strong>07</strong>
              <span>{pt ? 'continentes conectados' : 'connected continents'}</span>
            </div>
          </div>
        </div>
      </div>
      <section className="explore-main">
        <div className="container explore-layout">
          <div className="globe-column">
            <Globe
              selectedBranch={selectedBranch}
              selectedRoute={selectedRoute}
              onSelect={selectBranch}
            />
            <div className="globe-caption">
              <span className="gold-dot" />
              {pt ? 'Rota em destaque' : 'Featured route'}: {selectedRoute?.from}{' '}
              <MoveRight size={17} /> {selectedRoute?.to}
            </div>
          </div>
          <div className="branch-panel">
            <div className="branch-panel-top">
              <h2>{pt ? 'Nossas filiais' : 'Our branches'}</h2>
              <label className="filter-select">
                <span className="sr-only">{pt ? 'Filtrar continente' : 'Filter continent'}</span>
                <select value={continent} onChange={(event) => setContinent(event.target.value)}>
                  <option value="all">{pt ? 'Todos os continentes' : 'All continents'}</option>
                  {[...new Set(branches.map((branch) => branch.continent))].map((name) => (
                    <option key={name} value={name}>
                      {continentLabel(name, prefs.language)}
                    </option>
                  ))}
                </select>
                <ChevronDown size={15} />
              </label>
            </div>
            <div className="branch-list">
              {filteredBranches.map((branch) => (
                <button
                  type="button"
                  key={branch.code}
                  onClick={() => selectBranch(branch)}
                  className={`branch-item ${selectedCode === branch.code ? 'selected' : ''}`}
                >
                  <span className="branch-code">{branch.code}</span>
                  <span>
                    <strong>{cityLabel(branch, prefs.language)}</strong>
                    <small>
                      {continentLabel(branch.continent, prefs.language)}
                      {branch.seasonal ? ` · ${pt ? 'base sazonal' : 'seasonal base'}` : ''}
                    </small>
                  </span>
                  <ArrowUpRight size={17} />
                </button>
              ))}
            </div>
            <div className="branch-detail">
              <div>
                <span>{pt ? 'Filial selecionada' : 'Selected branch'}</span>
                <h3>{cityLabel(selectedBranch, prefs.language)}</h3>
                <p>
                  {countryLabel(selectedBranch.country, prefs.language)} · {selectedBranch.timezone}
                </p>
              </div>
              <a
                className="text-link"
                href={`https://www.google.com/maps?q=${selectedBranch.latitude},${selectedBranch.longitude}`}
                target="_blank"
                rel="noreferrer"
              >
                {pt ? 'Abrir no mapa' : 'Open in maps'}
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="section container explore-lower">
        <div className="route-choices">
          <SectionHeading
            title={
              pt
                ? `Saindo de ${cityLabel(selectedBranch, prefs.language)}`
                : `From ${cityLabel(selectedBranch, prefs.language)}`
            }
            description={
              pt
                ? 'Escolha uma rota para destacar no globo.'
                : 'Choose a route to highlight on the globe.'
            }
          />
          <div className="route-chips">
            {availableRoutes.map((route) => (
              <button
                key={route.id}
                type="button"
                className={selectedRoute?.id === route.id ? 'active' : ''}
                onClick={() => setSelectedRouteId(route.id)}
              >
                {route.from} <MoveRight size={15} /> {route.to}
              </button>
            ))}
          </div>
          {selectedRoute && (
            <Link className="button button-navy" to={`/trip/${selectedRoute.id}`}>
              {pt ? 'Ver viagem' : 'View trip'}
              <ArrowRight size={17} />
            </Link>
          )}
        </div>
        <WeatherCard branch={selectedBranch} prefs={prefs} region />
      </section>
    </>
  );
}

function PriceTrend({ route, prefs }: { route: Route; prefs: Preferences }) {
  const multipliers = [1.12, 1.08, 1.1, 1.03, 1.05, 1];
  const values = multipliers.map((value) => Math.round(route.priceBRL * value));
  const min = Math.min(...values) * 0.92;
  const max = Math.max(...values) * 1.06;
  const points = values
    .map((value, index) => `${38 + index * 92},${170 - ((value - min) / (max - min)) * 135}`)
    .join(' ');
  return (
    <div className="chart-block">
      <div className="chart-title">
        <h3>{prefs.language === 'pt' ? 'Evolução estimada do preço' : 'Estimated price trend'}</h3>
        <DemoTag language={prefs.language} />
      </div>
      <svg
        className="line-chart"
        viewBox="0 0 540 210"
        role="img"
        aria-label={
          prefs.language === 'pt'
            ? 'Gráfico de linha de preço estimado em seis semanas'
            : 'Line chart of estimated price over six weeks'
        }
      >
        <path d="M38 170H510M38 105H510M38 40H510" stroke="#e1eaf0" strokeWidth="1" />
        <polyline
          points={points}
          fill="none"
          stroke="#1467a4"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {values.map((value, index) => (
          <g key={index}>
            <circle
              cx={38 + index * 92}
              cy={170 - ((value - min) / (max - min)) * 135}
              r={index === values.length - 1 ? 7 : 4}
              fill={index === values.length - 1 ? '#c89943' : '#1467a4'}
            />
            <text x={38 + index * 92} y="198" textAnchor="middle" fill="#6d8498" fontSize="11">
              {index === 5 ? (prefs.language === 'pt' ? 'Hoje' : 'Now') : `${6 - index} sem.`}
            </text>
          </g>
        ))}
      </svg>
      <p>
        {prefs.language === 'pt'
          ? 'Série ilustrativa para comparação visual. Não representa histórico real.'
          : 'Illustrative series for visual comparison. Not actual history.'}
      </p>
    </div>
  );
}

function SpendingChart({
  route,
  prefs,
  passengers = 1,
}: {
  route: Route;
  prefs: Preferences;
  passengers?: number;
}) {
  const quote = makeQuote(route, passengers, false, 'standard', prefs.currency);
  const total = quote.total;
  const farePercent = Math.round((quote.fare / total) * 100);
  const pt = prefs.language === 'pt';
  return (
    <div className="chart-block spending-chart">
      <div className="chart-title">
        <h3>{pt ? 'Como o valor se distribui' : 'Where your money goes'}</h3>
        <DemoTag language={prefs.language} />
      </div>
      <div
        className="stack-bar"
        role="img"
        aria-label={`${pt ? 'Tarifa' : 'Fare'} ${farePercent}%, ${pt ? 'taxas' : 'taxes'} ${100 - farePercent}%`}
      >
        <span style={{ width: `${farePercent}%` }} />
        <span style={{ width: `${100 - farePercent}%` }} />
      </div>
      <div className="chart-legend">
        <div>
          <i className="legend-blue" />
          <span>{pt ? 'Tarifa base' : 'Base fare'}</span>
          <strong>
            {new Intl.NumberFormat(pt ? 'pt-BR' : 'en-US', {
              style: 'currency',
              currency: prefs.currency,
              maximumFractionDigits: 0,
            }).format(quote.fare)}
          </strong>
        </div>
        <div>
          <i className="legend-gold" />
          <span>{pt ? 'Taxas estimadas' : 'Estimated taxes'}</span>
          <strong>
            {new Intl.NumberFormat(pt ? 'pt-BR' : 'en-US', {
              style: 'currency',
              currency: prefs.currency,
              maximumFractionDigits: 0,
            }).format(quote.taxes)}
          </strong>
        </div>
      </div>
    </div>
  );
}

function AirportCompare({ route, prefs }: { route: Route; prefs: Preferences }) {
  const competitors = routes
    .filter((candidate) => candidate.to === route.to && candidate.id !== route.id)
    .slice(0, 2);
  const comparison = [route, ...competitors];
  const max = Math.max(...comparison.map((candidate) => candidate.priceBRL)) * 1.1;
  const pt = prefs.language === 'pt';
  return (
    <div className="chart-block">
      <div className="chart-title">
        <h3>{pt ? 'Comparação entre aeroportos' : 'Airport price comparison'}</h3>
        <DemoTag language={prefs.language} />
      </div>
      {competitors.length ? (
        <>
          <p>
            {pt
              ? `Origens disponíveis para ${cityLabel(findBranch(route.to)!, prefs.language)}`
              : `Available origins for ${cityLabel(findBranch(route.to)!, prefs.language)}`}
          </p>
          <div className="compare-bars">
            {comparison.map((candidate) => (
              <div key={candidate.id} className="compare-row">
                <span>{candidate.from}</span>
                <div>
                  <span
                    style={{ width: `${(candidate.priceBRL / max) * 100}%` }}
                    className={candidate.id === route.id ? 'primary' : ''}
                  />
                </div>
                <strong>{money(candidate.priceBRL, prefs.currency, prefs.language)}</strong>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="compare-empty">
          {pt
            ? 'Esta rota é a única origem disponível para este destino na rede demonstrativa.'
            : 'This route is the only available origin to this destination in the demo network.'}
        </p>
      )}
    </div>
  );
}

function Trip({ prefs }: { prefs: Preferences }) {
  const { id } = useParams();
  const [params] = useSearchParams();
  const route = useRouteData(id);
  const pt = prefs.language === 'pt';
  if (!route) return <NotFound prefs={prefs} />;
  const from = findBranch(route.from)!;
  const to = findBranch(route.to)!;
  const date = params.get('date') || futureDate();
  const passengers = Math.min(8, Math.max(1, Number(params.get('passengers')) || 1));
  return (
    <>
      <div className="page-intro container trip-intro">
        <div>
          <p className="breadcrumb">
            <Link to="/">{pt ? 'Início' : 'Home'}</Link> /{' '}
            <Link to="/flights">{pt ? 'Voos' : 'Flights'}</Link> / FBD {route.id.split('-')[1]}
          </p>
          <h1>
            {cityLabel(from, prefs.language)} <span>→</span> {cityLabel(to, prefs.language)}
          </h1>
          <p>
            {dateLabel(date, prefs.language)} · {passengers} {pt ? 'passageiro(s)' : 'passenger(s)'}{' '}
            · {route.aircraft}
          </p>
        </div>
        <DemoTag language={prefs.language} />
      </div>
      <div className="container trip-layout">
        <div className="trip-main">
          <section className="itinerary">
            <div className="itinerary-head">
              <span>FBD {route.id.split('-')[1]}</span>
              <span>
                {route.stops === 0
                  ? pt
                    ? 'Voo direto'
                    : 'Direct flight'
                  : pt
                    ? '1 escala'
                    : '1 stop'}
              </span>
            </div>
            <div className="itinerary-track">
              <div>
                <strong>{route.departure}</strong>
                <span>{from.code}</span>
                <small>{cityLabel(from, prefs.language)}</small>
              </div>
              <div className="itinerary-middle">
                <span>{durationLabel(route.durationMinutes)}</span>
                <div>
                  <Plane size={19} />
                </div>
              </div>
              <div>
                <strong>{route.arrival}</strong>
                <span>{to.code}</span>
                <small>{cityLabel(to, prefs.language)}</small>
              </div>
            </div>
            <div className="itinerary-foot">
              <span>
                <CalendarDays size={16} />
                {dateLabel(date, prefs.language)}
              </span>
              <span>
                <BaggageClaim size={17} />
                {pt ? 'Bagagem opcional' : 'Optional baggage'}
              </span>
            </div>
          </section>
          <div className="trip-globe">
            <Globe selectedBranch={from} selectedRoute={route} onSelect={() => {}} compact />
            <div>
              <span>{pt ? 'Sua rota pelo mundo' : 'Your route around the world'}</span>
              <strong>
                {route.from} <MoveRight size={17} /> {route.to}
              </strong>
            </div>
          </div>
          <div className="trip-charts">
            <SectionHeading
              title={pt ? 'Planeje com mais clareza' : 'Plan with more clarity'}
              description={
                pt
                  ? 'Referências visuais baseadas em dados fictícios.'
                  : 'Visual references based on fictional data.'
              }
            />
            <div className="chart-grid">
              <PriceTrend route={route} prefs={prefs} />
              <SpendingChart route={route} prefs={prefs} passengers={passengers} />
              <AirportCompare route={route} prefs={prefs} />
            </div>
          </div>
        </div>
        <aside className="trip-sidebar">
          <div className="booking-summary">
            <span>{pt ? 'Preço estimado por pessoa' : 'Estimated price per person'}</span>
            <strong>{money(route.priceBRL, prefs.currency, prefs.language)}</strong>
            <p>
              {pt
                ? 'Taxas e serviços opcionais calculados na próxima etapa.'
                : 'Taxes and optional services calculated in the next step.'}
            </p>
            <Link
              className="button button-gold"
              to={`/checkout?route=${route.id}&date=${date}&passengers=${passengers}`}
            >
              {pt ? 'Continuar reserva' : 'Continue booking'}
              <ArrowRight size={17} />
            </Link>
            <small>{pt ? 'Simulação · sem cobrança' : 'Demo · no charge'}</small>
          </div>
          <WeatherCard branch={to} prefs={prefs} />
        </aside>
      </div>
    </>
  );
}

function Checkout({ prefs }: { prefs: Preferences }) {
  const [params] = useSearchParams();
  const route = findRoute(params.get('route') || 'fbd-101') ?? routes[0]!;
  const date = params.get('date') || futureDate();
  const passengers = Math.min(8, Math.max(1, Number(params.get('passengers')) || 1));
  const pt = prefs.language === 'pt';
  const [names, setNames] = useState<string[]>(Array.from({ length: passengers }, () => ''));
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [seat, setSeat] = useState<'standard' | 'extra'>('standard');
  const [baggage, setBaggage] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const quote = makeQuote(route, passengers, baggage, seat, prefs.currency);
  const formatter = new Intl.NumberFormat(pt ? 'pt-BR' : 'en-US', {
    style: 'currency',
    currency: prefs.currency,
    maximumFractionDigits: 0,
  });
  const origin = findBranch(route.from)!;
  const destination = findBranch(route.to)!;

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const response = await fetch('/api/checkout/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          routeId: route.id,
          passengers,
          baggage,
          seat,
          currency: prefs.currency,
        }),
      });
      if (!response.ok) throw new Error('Quote failed');
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError(
        pt
          ? 'Não foi possível confirmar a simulação. Verifique se a API está em execução e tente novamente.'
          : 'Could not confirm the demo booking. Check that the API is running and try again.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted)
    return (
      <div className="container confirmation">
        <div className="confirmation-icon">
          <Check size={37} />
        </div>
        <h1>
          {pt ? 'Sua viagem está confirmada. Por aqui.' : 'Your trip is confirmed. In this demo.'}
        </h1>
        <p>
          {pt
            ? 'Esta confirmação é fictícia. Nenhuma reserva foi emitida e nenhuma cobrança foi realizada.'
            : 'This confirmation is fictional. No ticket was issued and no charge was made.'}
        </p>
        <div className="confirmation-ticket">
          <span>FBD · DEMO {route.id.split('-')[1]}</span>
          <strong>
            {origin.code} <MoveRight size={24} /> {destination.code}
          </strong>
          <span>
            {dateLabel(date, prefs.language)} · {passengers} {pt ? 'passageiro(s)' : 'passenger(s)'}
          </span>
        </div>
        <Link className="button button-navy" to="/">
          {pt ? 'Voltar ao início' : 'Back to home'}
          <ArrowRight size={17} />
        </Link>
      </div>
    );

  return (
    <>
      <div className="page-intro container checkout-intro">
        <div>
          <p className="breadcrumb">
            <Link to="/">{pt ? 'Início' : 'Home'}</Link> /{' '}
            <Link to={`/trip/${route.id}`}>{pt ? 'Viagem' : 'Trip'}</Link> / Checkout
          </p>
          <h1>{pt ? 'Finalize sua viagem' : 'Complete your trip'}</h1>
          <p>
            {pt
              ? 'Uma simulação completa, sem pagamento ou emissão de bilhete.'
              : 'A complete simulation, with no payment or ticket issuance.'}
          </p>
        </div>
        <DemoTag language={prefs.language} />
      </div>
      <div className="container checkout-layout">
        <form className="checkout-form" onSubmit={submit}>
          <div className="checkout-notice">
            <ShieldCheck size={22} />
            <p>
              <strong>{pt ? 'Ambiente de demonstração' : 'Demo environment'}</strong>
              <br />
              {pt
                ? 'Não insira dados reais de cartão. Os campos de pagamento são apenas ilustrativos.'
                : 'Do not enter real card details. Payment fields are illustrative only.'}
            </p>
          </div>
          <section className="checkout-section">
            <div className="checkout-section-title">
              <span>1</span>
              <div>
                <h2>{pt ? 'Dados dos passageiros' : 'Passenger details'}</h2>
                <p>
                  {pt
                    ? 'Preencha os nomes para concluir a simulação.'
                    : 'Enter names to complete the simulation.'}
                </p>
              </div>
            </div>
            <div className="checkout-fields">
              {names.map((name, index) => (
                <label className="field full" key={index}>
                  <span>
                    {pt
                      ? `Nome completo · passageiro ${index + 1}`
                      : `Full name · passenger ${index + 1}`}
                  </span>
                  <input
                    required
                    minLength={2}
                    autoComplete="name"
                    value={name}
                    onChange={(event) =>
                      setNames(
                        names.map((current, currentIndex) =>
                          currentIndex === index ? event.target.value : current,
                        ),
                      )
                    }
                    placeholder={pt ? 'Nome e sobrenome' : 'First and last name'}
                  />
                </label>
              ))}
              <label className="field">
                <span>E-mail</span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="voce@exemplo.com"
                />
              </label>
              <label className="field">
                <span>{pt ? 'Telefone' : 'Phone'}</span>
                <input
                  type="tel"
                  required
                  autoComplete="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="(11) 99999-9999"
                />
              </label>
            </div>
          </section>
          <section className="checkout-section">
            <div className="checkout-section-title">
              <span>2</span>
              <div>
                <h2>{pt ? 'Personalize sua viagem' : 'Customize your trip'}</h2>
                <p>
                  {pt
                    ? 'Escolhas opcionais incluídas no preço simulado.'
                    : 'Optional choices included in the demo price.'}
                </p>
              </div>
            </div>
            <div className="option-list">
              <label className={`option-row ${seat === 'standard' ? 'chosen' : ''}`}>
                <input
                  type="radio"
                  name="seat"
                  checked={seat === 'standard'}
                  onChange={() => setSeat('standard')}
                />
                <span>
                  <strong>{pt ? 'Assento padrão' : 'Standard seat'}</strong>
                  <small>{pt ? 'Escolha gratuita' : 'Included'}</small>
                </span>
                <b>{pt ? 'Incluso' : 'Included'}</b>
              </label>
              <label className={`option-row ${seat === 'extra' ? 'chosen' : ''}`}>
                <input
                  type="radio"
                  name="seat"
                  checked={seat === 'extra'}
                  onChange={() => setSeat('extra')}
                />
                <span>
                  <strong>{pt ? 'Espaço extra' : 'Extra legroom'}</strong>
                  <small>{pt ? 'Mais conforto a bordo' : 'More comfort on board'}</small>
                </span>
                <b>+ {money(140, prefs.currency, prefs.language)}</b>
              </label>
              <label className={`option-row ${baggage ? 'chosen' : ''}`}>
                <input
                  type="checkbox"
                  checked={baggage}
                  onChange={(event) => setBaggage(event.target.checked)}
                />
                <span>
                  <strong>{pt ? 'Bagagem despachada' : 'Checked baggage'}</strong>
                  <small>
                    {pt ? 'Uma peça adicional por pessoa' : 'One extra piece per person'}
                  </small>
                </span>
                <b>+ {money(180, prefs.currency, prefs.language)}</b>
              </label>
            </div>
          </section>
          <section className="checkout-section">
            <div className="checkout-section-title">
              <span>3</span>
              <div>
                <h2>{pt ? 'Pagamento simulado' : 'Simulated payment'}</h2>
                <p>
                  {pt
                    ? 'O cartão abaixo é um exemplo visual e não pode ser alterado.'
                    : 'The card below is a visual example and cannot be changed.'}
                </p>
              </div>
            </div>
            <div className="payment-example">
              <div className="payment-heading">
                <CreditCard size={20} />
                <strong>{pt ? 'Cartão fictício' : 'Demo card'}</strong>
                <span>{pt ? 'Somente visual' : 'Visual only'}</span>
              </div>
              <div className="checkout-fields">
                <label className="field full">
                  <span>{pt ? 'Número do cartão' : 'Card number'}</span>
                  <input value="•••• •••• •••• 4242" readOnly aria-readonly="true" />
                </label>
                <label className="field">
                  <span>{pt ? 'Validade' : 'Expiry'}</span>
                  <input value="12/30" readOnly aria-readonly="true" />
                </label>
                <label className="field">
                  <span>CVV</span>
                  <input value="•••" readOnly aria-readonly="true" />
                </label>
              </div>
            </div>
          </section>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="button button-gold confirm-button" disabled={submitting}>
            {submitting
              ? pt
                ? 'Confirmando…'
                : 'Confirming…'
              : pt
                ? 'Confirmar simulação'
                : 'Confirm demo booking'}
            <ArrowRight size={18} />
          </button>
          <p className="checkout-disclaimer">
            {pt
              ? 'Ao continuar, você verá apenas uma confirmação fictícia. Nenhum dado pessoal é enviado ao servidor.'
              : 'You will only see a fictional confirmation. No personal data is sent to the server.'}
          </p>
        </form>
        <aside className="checkout-sidebar">
          <div className="checkout-summary">
            <h2>{pt ? 'Resumo da viagem' : 'Trip summary'}</h2>
            <div className="summary-route">
              <span>{origin.code}</span>
              <Plane size={20} />
              <span>{destination.code}</span>
            </div>
            <p>
              {cityLabel(origin, prefs.language)} → {cityLabel(destination, prefs.language)}
              <br />
              {dateLabel(date, prefs.language)} · {passengers}{' '}
              {pt ? 'passageiro(s)' : 'passenger(s)'}
            </p>
            <div className="summary-lines">
              <div>
                <span>{pt ? 'Tarifa' : 'Fare'}</span>
                <strong>{formatter.format(quote.fare)}</strong>
              </div>
              <div>
                <span>{pt ? 'Taxas estimadas' : 'Estimated taxes'}</span>
                <strong>{formatter.format(quote.taxes)}</strong>
              </div>
              <div>
                <span>{pt ? 'Opcionais' : 'Extras'}</span>
                <strong>{formatter.format(quote.extras)}</strong>
              </div>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <strong>{formatter.format(quote.total)}</strong>
            </div>
            <small>
              {pt ? 'Valores fictícios · sem cobrança real' : 'Fictional values · no real charge'}
            </small>
          </div>
        </aside>
      </div>
    </>
  );
}

function Insights({ prefs }: { prefs: Preferences }) {
  const pt = prefs.language === 'pt';
  const [routeId, setRouteId] = useState('fbd-101');
  const route = findRoute(routeId)!;
  const average = Math.round(
    routes.reduce((total, item) => total + item.priceBRL, 0) / routes.length,
  );
  return (
    <>
      <div className="page-intro container">
        <div>
          <p className="breadcrumb">
            <Link to="/">{pt ? 'Início' : 'Home'}</Link> / {pt ? 'Análises' : 'Insights'}
          </p>
          <h1>{pt ? 'Números para viajar melhor' : 'Numbers for better travel'}</h1>
          <p>
            {pt
              ? 'Uma visão pública de valores ilustrativos da rede FBD.'
              : 'A public view of illustrative values across the FBD network.'}
          </p>
        </div>
        <DemoTag language={prefs.language} />
      </div>
      <div className="container insights-main">
        <div className="insights-head">
          <div>
            <strong>{money(average, prefs.currency, prefs.language)}</strong>
            <span>
              {pt ? 'tarifa média da rede fictícia' : 'average fare in the fictional network'}
            </span>
          </div>
          <label className="filter-select">
            <span className="sr-only">{pt ? 'Selecionar rota' : 'Select route'}</span>
            <select value={routeId} onChange={(event) => setRouteId(event.target.value)}>
              {routes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.from} → {item.to}
                </option>
              ))}
            </select>
            <ChevronDown size={15} />
          </label>
        </div>
        <div className="chart-grid insights-grid">
          <PriceTrend route={route} prefs={prefs} />
          <SpendingChart route={route} prefs={prefs} />
          <AirportCompare route={route} prefs={prefs} />
        </div>
        <p className="insights-note">
          {pt
            ? 'As séries, tarifas e comparações desta página são sintéticas e não representam cotações de mercado.'
            : 'Series, fares and comparisons on this page are synthetic and do not represent market quotes.'}
        </p>
      </div>
    </>
  );
}

function NotFound({ prefs }: { prefs: Preferences }) {
  const pt = prefs.language === 'pt';
  return (
    <div className="container not-found">
      <Globe2 size={42} />
      <h1>{pt ? 'Esta rota não está no mapa.' : 'This route is not on the map.'}</h1>
      <p>
        {pt
          ? 'Volte ao início ou explore as viagens disponíveis.'
          : 'Head home or explore available trips.'}
      </p>
      <Link className="button button-navy" to="/">
        {pt ? 'Voltar ao início' : 'Back to home'}
        <ArrowRight size={17} />
      </Link>
    </div>
  );
}

export default App;
