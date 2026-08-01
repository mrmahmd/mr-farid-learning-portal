const CACHE = "connect-plus-primary-1-stations-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./course-data.js",
  "./app.js",
  "./js/portal-progress.js",
  "./manifest.json",
  "./assets/welcome.png",
  "./assets/unit1.png",
  "./assets/unit2.png",
  "./assets/unit3.png",
  "./assets/unit4.png",
  "./assets/unit5.png",
  "./assets/unit6.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html"))),
  );
});
