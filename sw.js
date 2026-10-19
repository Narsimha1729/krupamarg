// Krupamarg service worker: app shells cached for offline use (devotee app and priest app);
// Google Fonts cached on first load; config and Firebase traffic always go to the network.
const CACHE = 'krupamarg-v8';
const SHELL = ['./', './index.html', './manifest.webmanifest', './cloud.js', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png',
  './priest/', './priest/index.html', './priest/manifest.webmanifest'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(SHELL.map(u => c.add(new Request(u, { cache: 'reload' })).catch(() => {})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
const networkFirst = req => fetch(req, { cache: 'no-cache' }).then(r => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); } return r; })
  .catch(() => caches.match(req, { ignoreSearch: true }));
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); return r; })
      .catch(() => caches.match(req, { ignoreSearch: true }).then(hit => hit || caches.match(url.pathname.includes('/priest/') ? './priest/index.html' : './index.html'))));
    return;
  }
  if (url.origin === location.origin) {
    if (url.pathname.endsWith('firebase-config.js') || url.pathname.endsWith('cloud.js')) { e.respondWith(networkFirst(req)); return; }
    e.respondWith(caches.match(req).then(hit => {
      const net = fetch(req).then(r => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); } return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  if (url.host.endsWith('fonts.googleapis.com') || url.host.endsWith('fonts.gstatic.com')) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); return r; })));
  }
  // everything else (Firebase, gstatic SDK, Google APIs) goes straight to the network
});
