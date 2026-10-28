/* HYROX Coach service worker: the app shell starts offline; calls to your Sheet always go to the network. */
var CACHE = 'hx-shell-v2';
var SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-180.png'];
self.addEventListener('install', function (e) { e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); })); });
self.addEventListener('activate', function (e) { e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); })); });
self.addEventListener('fetch', function (e) {
  var u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;   // API calls and fonts go straight to the network
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(function (hit) {
    var net = fetch(e.request).then(function (r) { if (r && r.ok) caches.open(CACHE).then(function (c) { c.put(e.request, r.clone()); }); return r; }).catch(function () { return hit; });
    return hit || net;
  }));
});
self.addEventListener('push', function (e) {
  var d = {}; try { d = e.data ? e.data.json() : {}; } catch (x) { d = { title: 'HYROX Coach', body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'HYROX Coach', { body: d.body || 'Time to train.', icon: './icon-192.png', badge: './icon-192.png', data: d.url || './' }));
});
self.addEventListener('notificationclick', function (e) { e.notification.close(); e.waitUntil(self.clients.matchAll({ type: 'window' }).then(function (cs) { if (cs.length) return cs[0].focus(); return self.clients.openWindow('./'); })); });
