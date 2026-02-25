const CACHE_NAME = 'sro-ultra-v1';
const urlsToCache = [
  '/SRO/',
  '/SRO/index.html',
  '/SRO/manifest.json',
  // Se os ícones tiverem nomes diferentes, atualize aqui:
  '/SRO/icon-192.png',
  '/SRO/icon-512.png'
];

// Instala o Service Worker e guarda os arquivos no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto com sucesso!');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta as requisições para funcionar mais rápido/offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna do cache se encontrar, senão busca na internet
        return response || fetch(event.request);
      })
  );
});
