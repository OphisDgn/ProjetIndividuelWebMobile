/** VARS */
const ORIGIN_URL = `${location.protocol}//${location.host}`;
const CACHE_NAME = "offline-v2";
const OFFLINE_URL = "offline.html";
const CACHED_FILES = [
  OFFLINE_URL,
  "https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js",
  `${ORIGIN_URL}/css/index.css`,
  `${ORIGIN_URL}/js/index.js`,
  `${ORIGIN_URL}/js/top.js`,
  `${ORIGIN_URL}/js/jquery-3.6.0.min.js`,
  `${ORIGIN_URL}/data/data.json`,
  `${ORIGIN_URL}/img/logo.png`,
  `${ORIGIN_URL}/img/logos/144x144.png`
];
/** FUNCTIONS */

/** Fetch */

const sendOfflinePage = (resolve) => {
  caches.open(CACHE_NAME).then((cache) => {
    cache.match(OFFLINE_URL).then((cachedResponse) => {
      resolve(cachedResponse);
    });
  });
};

const respondWithFetchPromiseNavigate = (event) =>
  new Promise((resolve) => {
    event.preloadResponse
      .then((preloadResponse) => {
        if (preloadResponse) {
          resolve(preloadResponse);
        }

        // Always try the network first.
        fetch(event.request)
          .then((networkResponse) => {
            resolve(networkResponse);
          })
          // send cache offline.html
          .catch(() => sendOfflinePage(resolve));
      })
      .catch(() => sendOfflinePage(resolve));
  });

const fetchSW = (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(respondWithFetchPromiseNavigate(event));
  } else if (CACHED_FILES.includes(event.request.url)) {
    event.respondWith(caches.match(event.request));
  }
};

/*********************************** */

/** Activate */
const deleteOldCaches = () =>
  new Promise((resolve) => {
    caches.keys().then((keys) => {
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            caches.delete(key);
          }
        })
      ).finally(resolve);
    });
  });

const waitUntilActivatePromise = () =>
  new Promise((resolve) => {
    deleteOldCaches().then(() => {
      if ("navigationPreload" in self.registration) {
        self.registration.navigationPreload.enable().finally(resolve);
      }
    });
  });

const activate = (event) => {
  event.waitUntil(waitUntilActivatePromise());
  self.clients.claim();
};

/*********************************** */

/** Install */
const waitUntilInstallationPromise = () =>
  new Promise((resolve) => {
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(CACHED_FILES).then(resolve);
    });
  });

const installSW = (event) => {
  event.waitUntil(waitUntilInstallationPromise());
  self.skipWaiting();
};
/*********************************** */

/** INIT */
self.addEventListener("install", installSW);
self.addEventListener("activate", activate);
self.addEventListener("fetch", fetchSW);
