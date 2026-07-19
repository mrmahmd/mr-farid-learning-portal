const CACHE = 'english-primary3-v1';
const CORE = [
  './', './index.html', './css/style.css',
  './js/curriculum.js', './js/question-engine.js', './js/storage.js', './js/app.js',
  './assets/images/hero.jpg', './assets/images/omar-laila.png',
  './assets/images/unit-1.jpg', './assets/images/unit-2.jpg', './assets/images/unit-3.jpg',
  './assets/images/unit-4.jpg', './assets/images/unit-5.jpg', './assets/images/unit-6.jpg'
];
self.addEventListener('install', (event) => event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(CORE)).then(() => self.skipWaiting())));
self.addEventListener('activate', (event) => event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
    const copy = response.clone(); caches.open(CACHE).then((cache) => cache.put(event.request, copy)); return response;
  }).catch(() => caches.match('./index.html'))));
});
