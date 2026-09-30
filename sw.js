// Réseau d'abord, cache en secours : les mises à jour du site arrivent tout de suite.
const CACHE = 'winter-arc-v3';
const SHELL = ['./', './index.html', './manifest.webmanifest', './vendor/supabase.js', './icons/icon-192.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).catch(() => {})); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; })
    .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html'))));
});

// Notifications push
self.addEventListener('push', e => {
  let d = {}; try { d = e.data ? e.data.json() : {}; } catch (_) { d = { title: 'Winter Arc', body: e.data ? e.data.text() : '' }; }
  e.waitUntil((async () => {
    if (d.kind === 'pomo') {
      const cs = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      if (cs.some(c => c.visibilityState === 'visible')) return; // l'app est ouverte : elle sonne déjà
    }
    await self.registration.showNotification(d.title || 'Winter Arc', {
      body: d.body || '', tag: d.tag || d.kind || 'winter-arc', renotify: true,
      icon: 'icons/icon-192.png', badge: 'icons/icon-192.png', data: { url: './' }
    });
  })());
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil((async () => {
    const cs = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of cs) { if ('focus' in c) return c.focus(); }
    return self.clients.openWindow('./');
  })());
});
