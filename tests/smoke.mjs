/* global process, document, window */
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.env.FBD_BASE_URL || 'http://127.0.0.1:5173';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

try {
  const branches = await page.request.get(`${base}/api/branches`);
  const routes = await page.request.get(`${base}/api/routes`);
  const weather = await page.request.get(`${base}/api/weather/europe`);
  assert.equal(branches.status(), 200);
  assert.equal(routes.status(), 200);
  assert.equal(weather.status(), 200);
  assert.equal((await branches.json()).data.length, 7);
  assert.equal((await routes.json()).data.length, 12);
  assert.equal((await weather.json()).data.synthetic, true);

  await page.goto(base);
  await page.getByRole('heading', { name: /Seu próximo destino começa/ }).waitFor();
  await page.getByRole('button', { name: /Buscar voos/ }).click();
  await page.getByRole('heading', { name: /São Paulo → Lisboa/ }).waitFor();
  await page
    .getByRole('link', { name: /Ver detalhes/ })
    .first()
    .click();
  await page.getByRole('heading', { name: /São Paulo → Lisboa/ }).waitFor();
  await page.getByRole('heading', { name: /Evolução estimada do preço/ }).waitFor();
  await page.getByRole('link', { name: /Continuar reserva/ }).click();
  await page.getByRole('heading', { name: /Finalize sua viagem/ }).waitFor();
  await page.getByLabel('Nome completo · passageiro 1').fill('Pessoa Demonstração');
  await page.getByLabel('E-mail').fill('demo@example.com');
  await page.getByLabel('Telefone').fill('11999999999');
  await page.getByRole('radio', { name: /Espaço extra/ }).check();
  await page.getByRole('checkbox', { name: /Bagagem despachada/ }).check();
  await page.getByRole('button', { name: /Confirmar simulação/ }).click();
  await page.getByRole('heading', { name: /Sua viagem está confirmada/ }).waitFor();
  assert.match(await page.locator('.confirmation').innerText(), /Nenhuma reserva foi emitida/);

  await page.goto(`${base}/explore`);
  await page.getByRole('heading', { name: /Explore o mundo/ }).waitFor();
  await page.getByRole('button', { name: /Base Meridian/ }).click();
  assert.match(await page.locator('.branch-detail').innerText(), /Base Meridian/);

  await page.goto(base);
  await page.getByLabel('Idioma').selectOption('en');
  await page.getByLabel('Currency').selectOption('USD');
  assert.match(await page.locator('.hero').innerText(), /Your next destination/);
  assert.match(await page.locator('.destination-grid').innerText(), /\$\d+/);

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  for (const route of ['/', '/explore', '/flights?from=GRU&to=LIS', '/checkout?route=fbd-101']) {
    await mobile.goto(`${base}${route}`);
    const widths = await mobile.evaluate(() => ({
      document: document.documentElement.scrollWidth,
      viewport: window.innerWidth,
    }));
    assert.ok(
      widths.document <= widths.viewport + 1,
      `${route} overflows at 390px: ${JSON.stringify(widths)}`,
    );
  }
  await mobile.close();
  process.stdout.write(
    'Smoke test passed: API, booking, globe, PT/EN, BRL/USD and 390px layouts.\n',
  );
} finally {
  await browser.close();
}
