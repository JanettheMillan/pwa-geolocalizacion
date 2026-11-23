const CACHE = 'asistencia-geo-v1';
const ARCHIVOS = [
  './',
  './index.html',
  './styles.css',
  './geo-helper.js',
  './app.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Guardar el App Shell al instalar
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ARCHIVOS))
  );
  self.skipWaiting();
});

// Eliminar versiones anteriores de la caché
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((lista) => {
      return Promise.all(
        lista.filter((nombre) => nombre !== CACHE).map((nombre) => caches.delete(nombre))
      );
    })
  );
  self.clients.claim();
});

// Cache First
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((enCache) => enCache || fetch(event.request))
  );
});
