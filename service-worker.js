const CACHE_NAME = "comet-os-v9";

const FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", event => {

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(FILES);
      })
      .catch(err => {
        console.log("CACHE INSTALL FAILED:", err);
      })
  );

  self.skipWaiting();

});

self.addEventListener("activate", event => {

  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(k => {
          if (k !== CACHE_NAME) {
            return caches.delete(k);
          }
        })
      );
    })
  );

  self.clients.claim();

});

self.addEventListener("fetch", event => {

  event.respondWith(
    fetch(event.request)
      .then(res => {

        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, res.clone());
          return res;
        });

      })
      .catch(() => {
        return caches.match(event.request)
          .then(res => res || caches.match("./index.html"));
      })
  );

});
