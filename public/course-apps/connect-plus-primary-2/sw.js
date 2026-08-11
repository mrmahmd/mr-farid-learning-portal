const CACHE = 'connect-plus-2-pixar-v5';
const FILES = [
  './','./index.html','./styles.css','./data.js','./app.js','./manifest.webmanifest','./js/portal-progress.js',
  './assets/icon.svg',
  './assets/covers/unit1.jpg','./assets/covers/unit2.jpg','./assets/covers/unit3.jpg',
  './assets/covers/unit4.jpg','./assets/covers/unit5.jpg','./assets/covers/unit6.jpg',
  './assets/lesson-media-new/warmup.jpg','./assets/lesson-media-new/review1.jpg',
  './assets/lesson-media-new/review2.jpg','./assets/lesson-media-new/animals-reader.jpg',
  './assets/lesson-media-new/story-cover.jpg'
];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE).then(c => c.put(event.request, copy));
    return response;
  }).catch(() => caches.match('./index.html'))));
});
