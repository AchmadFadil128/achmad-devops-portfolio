import { chromium } from 'playwright-core';
import fs from 'node:fs/promises';
import path from 'node:path';

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:3000';
const executablePath = process.env.CHROMIUM_PATH || '/usr/bin/chromium';
const output = path.resolve('browser-artifacts');
await fs.mkdir(output, { recursive: true });

function stripScripts(body) {
  return body
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<script\b[^>]*\/>/gi, '')
    .replace(/<link\b[^>]*>/gi, '');
}

async function getStaticSnapshot(route) {
  const response = await fetch(`${baseURL}${route}`);
  const html = await response.text();
  const cssPaths = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)].map((match) => match[1]);
  const css = (await Promise.all(cssPaths.map(async (href) => {
    const cssResponse = await fetch(new URL(href, baseURL));
    return cssResponse.text();
  }))).join('\n');
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? 'Portfolio';
  const body = stripScripts(html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '');

  return {
    status: response.status,
    html: `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><style>${css}</style></head><body>${body}</body></html>`,
  };
}

const browser = await chromium.launch({
  executablePath,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

const checks = [
  { name: 'desktop-home', route: '/', viewport: { width: 1440, height: 1000 } },
  { name: 'mobile-home', route: '/', viewport: { width: 390, height: 844 } },
  { name: 'desktop-projects', route: '/projects', viewport: { width: 1440, height: 1000 } },
  { name: 'mobile-project-detail', route: '/projects/portfolio-v3', viewport: { width: 390, height: 844 } },
  { name: 'desktop-about', route: '/about', viewport: { width: 1440, height: 1000 } },
  { name: 'mobile-certifications', route: '/certifications', viewport: { width: 390, height: 844 } },
  { name: 'desktop-writings', route: '/writings', viewport: { width: 1440, height: 1000 } },
  { name: 'desktop-404', route: '/does-not-exist', viewport: { width: 1440, height: 1000 } },
];

let failed = false;
for (const check of checks) {
  const page = await browser.newPage({ viewport: check.viewport });
  await page.route('https://picsum.photos/**', (route) => route.fulfill({
    status: 200,
    contentType: 'image/svg+xml',
    body: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="9"><rect width="16" height="9" fill="%23131b18"/></svg>',
  }));
  const consoleErrors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => consoleErrors.push(error.message));

  const snapshot = await getStaticSnapshot(check.route);
  await page.setContent(snapshot.html, { waitUntil: 'load' });
  await page.screenshot({ path: path.join(output, `${check.name}.png`), fullPage: true });
  const metrics = await page.evaluate(() => ({
    title: document.title,
    width: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth,
    h1: document.querySelector('h1')?.textContent?.trim() || '',
    bodyText: document.body.innerText.length,
    navVisible: getComputedStyle(document.querySelector('.site-header') || document.body).display !== 'none',
  }));

  const overflow = metrics.width > metrics.viewport + 1;
  const expectedStatus = check.route === '/does-not-exist'
    ? snapshot.status === 404
    : snapshot.status >= 200 && snapshot.status < 400;
  const ok = expectedStatus && !overflow && consoleErrors.length === 0 && metrics.h1.length > 0 && metrics.navVisible;
  failed ||= !ok;
  console.log(JSON.stringify({ ...check, status: snapshot.status, overflow, consoleErrors, metrics, ok }, null, 2));
  await page.close();
}

await browser.close();
if (failed) process.exit(1);
