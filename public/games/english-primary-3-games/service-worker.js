const CACHE = 'primary3-game-world-v4-navigation-visible-20260719';
const ASSETS = [
  './','./index.html','./css/game-world.css','./js/curriculum.js','./js/question-engine.js','./js/game-data.js','./js/portal-progress.js','./js/storage.js','./js/engines.js','./js/app.js','./manifest.webmanifest',
  './assets/images/game-world-hero.png','./assets/images/hero.jpg','./assets/images/omar-laila.png','./assets/images/lesson-banner.jpg','./assets/images/question-scene.jpg',
  './assets/images/unit-1.jpg','./assets/images/unit-2.jpg','./assets/images/unit-3.jpg','./assets/images/unit-4.jpg','./assets/images/unit-5.jpg','./assets/images/unit-6.jpg','./assets/images/icon-192.png','./assets/images/icon-512.png'
];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
    const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res;
  }).catch(() => caches.match('./index.html'))));
});
