self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/static/js/bundle.js",
        "/static/js/vendors~main.chunk.js",
        "/static/js/main.chunk.js",
        "/manifest.json",
        "/caphubLogo.png",
        "/caphubLogo144.png",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
