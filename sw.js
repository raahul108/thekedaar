const C = 'thekedaar-v15';
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(['./', './logo.png', './manifest.json']).catch(() => {}))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || /firestore\.googleapis|identitytoolkit|securetoken/.test(r.url)) return;
  e.respondWith(fetch(r).then(res => { const cp = res.clone(); caches.open(C).then(c => c.put(r, cp)).catch(() => {}); return res; }).catch(() => caches.match(r)));
});
