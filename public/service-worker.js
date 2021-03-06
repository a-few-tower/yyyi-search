/** キャッシュ名 */
var CACHE_NAME = 'cache-v1.5.1(19)';
/** キャッシュ対象のリソースリスト */
var filesToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // css
  '/css/reset.css',
  '/css/yyyi.css',
  '/css/theme.css',
  // js
  'https://code.jquery.com/jquery-3.3.1.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/lokijs/1.5.5/lokijs.min.js',
  // 'https://www.googletagmanager.com/gtag/js?id=UA-120458733-1',
  '/js/yyyi/core.js',
  '/js/yyyi/data.js',
  '/js/yyyi/master.js',
  '/js/yyyi/ui.js',
  '/js/yyyi/search.js',
  // images
  '/image/jpg200/01/01.jpg',
  '/image/jpg200/01/02.jpg',
  '/image/jpg200/01/03.jpg',
  '/image/jpg200/01/04.jpg',
  '/image/jpg200/01/05.jpg',
  '/image/jpg200/01/06.jpg',
  '/image/jpg200/01/07.jpg',
  '/image/jpg200/01/08.jpg',
  '/image/jpg200/01/09.jpg',
  '/image/jpg200/01/10.jpg',
  '/image/jpg200/01/11.jpg',
  '/image/jpg200/01/12.jpg',
  '/image/jpg200/01/13.jpg',
  '/image/jpg200/01/14.jpg',
  '/image/jpg200/01/15.jpg',
  '/image/jpg200/01/16.jpg',
  '/image/jpg200/01/17.jpg',
  '/image/jpg200/01/18.jpg',
  '/image/jpg200/01/19.jpg',
  '/image/jpg200/01/20.jpg',
  '/image/jpg200/01/21.jpg',
  '/image/jpg200/01/22.jpg',
  '/image/jpg200/01/23.jpg',
  '/image/jpg200/01/24.jpg',
  '/image/jpg200/02/01.jpg',
  '/image/jpg200/02/02.jpg',
  '/image/jpg200/02/03.jpg',
  '/image/jpg200/02/04.jpg',
  '/image/jpg200/02/05.jpg',
  '/image/jpg200/02/06.jpg',
  '/image/icon/app-icon-72x72.png',
  '/image/icon/app-icon-114x114.png',
  '/image/icon/app-icon-120x120.png',
  '/image/icon/app-icon-144x144.png',
  '/image/icon/launcher-icon-4x-192x192.png',
  '/image/icon/launcher-icon-4x-512x512.png',
  '/image/splash/launch-640x1136.png',
  '/image/splash/launch-750x1334.png',
  '/image/splash/launch-1125x2436.png',
  '/image/splash/launch-1242x2208.png',
  '/image/splash/launch-1536x2048.png',
  '/image/splash/launch-1668x2224.png',
  '/image/splash/launch-2048x2732.png',
  '/favicon.ico'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        console.log('[ServiceWorker] Removing old cache', key);
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
