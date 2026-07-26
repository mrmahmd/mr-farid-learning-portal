const CACHE='primary1-assessment-v5-dashboard-art';
const CORE=['./','index.html','assets/css/styles.css','assets/js/data.js','assets/js/app.js','assets/images/main-cover.png','assets/images/unit1-cover.png','assets/images/favicon.svg','manifest.webmanifest'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).catch(()=>{}));});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))));});
