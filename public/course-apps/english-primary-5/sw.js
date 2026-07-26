const CACHE_NAME = "primary5-premium-v4-detailed-cloud-progress";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/css/styles.css",
  "./assets/js/app.js",
  "./assets/js/curriculum-data.js",
  "./assets/js/detailed-explanations.js",
  "./assets/js/questions-data.js",
  "./assets/js/portal-progress.js",
  "./assets/icons/favicon.svg",
  "./assets/images/covers/home-cover.png",
  "./assets/images/covers/unit-1.png",
  "./assets/images/covers/unit-2.png",
  "./assets/images/covers/unit-3.png",
  "./assets/images/covers/unit-4.png",
  "./assets/images/covers/unit-5.png",
  "./assets/images/covers/unit-6.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match("./index.html")))
  );
});
