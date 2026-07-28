const CACHE='primary2-farid-v3';
const ASSETS=['./','./index.html','./css/styles.css','./js/data.js','./js/app.js','./manifest.webmanifest','./assets/images/hero.png','./assets/images/unit1.png','./assets/images/unit2.png','./assets/images/unit3.png','./assets/images/unit4.png','./assets/images/unit5.png','./assets/images/unit6.png','./assets/images/favicon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
