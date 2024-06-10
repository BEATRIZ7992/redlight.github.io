self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('rlg-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/game.html',
        '/styles.css',
        '/app.js',
        'images/red-light.png',
        'images/green-light.png',
        'images/shoe1.png',
        'images/shoe2.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
