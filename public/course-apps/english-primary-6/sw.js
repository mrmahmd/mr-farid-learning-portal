const CACHE = 'english-primary-6-v5-cloud-race-fix';
const ASSETS = [
  './', './index.html', './styles.css', './data.js', './banks.js', './app.js', './manifest.json',
  './assets/favicon.svg', './portal-progress.js', './assets/covers/main-cover.png',
  './assets/covers/unit-1.png', './assets/covers/unit-2.png', './assets/covers/unit-3.png',
  './assets/covers/unit-4.png', './assets/covers/unit-5.png', './assets/covers/unit-6.png'
];
self.addEventListener('install', (event) => event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS))));
self.addEventListener('activate', (event) => event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))));
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
    const copy = response.clone(); caches.open(CACHE).then((cache) => cache.put(event.request, copy)); return response;
  }).catch(() => caches.match('./index.html'))));
});
