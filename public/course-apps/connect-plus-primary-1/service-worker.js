const CACHE = 'connect-plus-p1-v2';
const FILES = [
  './',
  './index.html',
  './css/styles.css',
  './js/data.js',
  './js/app.js',
  './js/portal-progress.js',
  './manifest.webmanifest',
  './assets/icons/app-icon.svg',
  './assets/images/splash.png',
  './assets/images/theme1.png',
  './assets/images/theme2.png',
  './assets/images/unit1.png',
  './assets/images/unit2.png',
  './assets/images/unit3.png',
  './assets/images/unit4.png',
  './assets/images/unit5.png',
  './assets/images/unit6.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match('./index.html')))
  );
});
