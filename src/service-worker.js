/* eslint-disable no-restricted-globals */
import { STORES, saveObject, getAll, deleteObject } from './misc/indexedDB';
import { API } from './api/API';

// Cache version and names
const CACHE_VERSION = 2
const CURRENT_CACHES = {
    api: `api-cache-v${CACHE_VERSION}`,
    api_reports: `api-reports-cache-v${CACHE_VERSION}`,
    api_reports_search: `api-reports-search-cache-v${CACHE_VERSION}`,
    api_combos: `api-combos-cache-v${CACHE_VERSION}`,
    images: `images-cache-v${CACHE_VERSION}`,
    shell: `shell-cache-v${CACHE_VERSION}`,
}

// Cache app shell from __WB_MANIFEST from Workbox
const urlsToCache = self.__WB_MANIFEST.map(el => el.url).concat([
    '/',
    '/trex.png',
    './fonts/Roboto/Roboto-Light.ttf',
    './fonts/Exo/static/Exo-Bold.ttf',
    './fonts/Roboto_mono/RobotoMono-Light.ttf',
    './fonts/Oxanium/static/Oxanium-Medium.ttf',
])

// install service worker and cache app shell
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CURRENT_CACHES.shell).then((cache) => {
            return cache.addAll(urlsToCache)
        })
    )
})

// Delete old cache on activation of new service worker version and claim clients
self.addEventListener('activate', (event) => {
    const expectedCaches = Object.keys(CURRENT_CACHES).map(
        (key) => CURRENT_CACHES[key]
    )
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!expectedCaches.includes(cacheName)) {
                        return caches.delete(cacheName)
                    }
                    return null
                })
            )
        })
    )
    self.clients.claim()
})

// server online status constant
const SERVER_ONLINE = { serverOnline: true }
const SERVER_OFFLINE = { serverOnline: false }

// post message to client
function postMessageToClient(message) {
    self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
            client.postMessage(message)
        })
    })
}

// cache first then fetch strategy
function cacheFirstThenFetch(event, cacheName, requestUrlArray, notToRequestUrlArray = [], requestReplacer = '') {
    if (
        requestUrlArray.some((requestUrl) => {
            return event.request.url.indexOf(requestUrl) !== -1
        }) &&
        !notToRequestUrlArray.some((requestUrl) => {
            return event.request.url.indexOf(requestUrl) !== -1
        })
    ) {
        event.respondWith(
            caches.open(cacheName).then((cache) => {
                return cache.match(event.request).then((response) => {
                    if (response) return response
                    return fetch(event.request.clone())
                        .then((response) => {
                            if (response.ok) {
                                cache.put(event.request, response.clone())
                                postMessageToClient(SERVER_ONLINE)
                                return response
                            } else {
                                if (requestReplacer)
                                    return caches.match(requestReplacer)
                                return caches.match(event.request).then((response) => {
                                    if (response) return response
                                    else return new Response()
                                })
                            }
                        })
                        .catch(() => {
                            postMessageToClient(SERVER_OFFLINE)
                            if (requestReplacer)
                                return caches.match(requestReplacer)
                            return new Response()
                        })
                })
            })
        )
    }
}

// fetch first then cache strategy
function fetchFirstThenCache(event, cacheName, requestUrlArray, notToRequestUrlArray = [], requestReplacer = '') {
    if (
        requestUrlArray.some((requestUrl) => {
            return event.request.url.indexOf(requestUrl) !== -1
        }) &&
        !notToRequestUrlArray.some((requestUrl) => {
            return event.request.url.indexOf(requestUrl) !== -1
        })
    ) {

        event.respondWith(
            caches.open(cacheName).then((cache) => {
                return fetch(event.request.clone())
                    .then((response) => {
                        if (response.ok) {
                            cache.put(event.request, response.clone())
                            postMessageToClient(SERVER_ONLINE)
                            return response
                        } else {
                            if (requestReplacer)
                                return caches.match(requestReplacer)
                            if (response.status === 500)
                                return new Response()
                            return caches.match(event.request).then((response) => {
                                if (response) return response
                                else return new Response()
                            })
                        }
                    })
                    .catch(() => {
                        postMessageToClient(SERVER_OFFLINE)

                        return caches.match(event.request).then((response) => {
                            if (response) return response
                            else return new Response()
                        })
                    })
            })
        )
    }
}

// fetch strategies
self.addEventListener('fetch', (event) => {

    // Handle navigation requests
    const request = event.request
    const url = new URL(request.url)
    if (request.mode === 'navigate' && !url.pathname.startsWith('/_')) {
        event.respondWith(
            fetch(request).catch(() => {
                return caches.match('/index.html')
            })
        )
    }

    // get requests
    if (event.request.method === 'GET') {

        // cache first then fetch strategy for '/upload/images/' or '.png' requests
        cacheFirstThenFetch(
            event,
            CURRENT_CACHES.images,
            ['/upload/images/', '.png'],
            [],
            '/trex.png'
        )

        // cache first then fetch strategy for '/api/reports/' and '/api/users/top10' requests
        cacheFirstThenFetch(
            event,
            CURRENT_CACHES.api_reports,
            ['/api/reports/', '/api/users/top10'],
            ['/api/reports/count'],
        )

        // cache first then fetch strategy for combos requests '/api/departments' and '/api/other'
        cacheFirstThenFetch(
            event,
            CURRENT_CACHES.api_combos,
            ['/api/departments', '/api/other']
        )

        // fetch first then cache strategy for '/api/' requests with exceptions
        fetchFirstThenCache(
            event,
            CURRENT_CACHES.api,
            [
                '/api/',
            ]
            ,
            [
                '/api/reports/',
                '/api/reports?',
                '/api/reports/count',
                '/api/users/top10',
                '/api/comments',
                '/api/departments',
                '/api/other',
            ]
        )

        // fetch first then cache strategy for '/api/reports?' and '/api/comments' requests
        // TODO: fetch number of reports and comments on server, 
        // TODO: if different than in app then fetch first otherwise cache first
        fetchFirstThenCache(
            event,
            CURRENT_CACHES.api_reports_search,
            [
                '/api/reports?',
                '/api/reports/count',
            ]
        )
    }

    // post requests
    if (event.request.method === 'POST') {
        let storeName = ''
        let id = 0

        if (event.request.url.includes('/api/file')) storeName = 'image-store'
        if (event.request.url.includes('/api/reports')) storeName = 'reports-store'
        if (event.request.url.includes('/api/reports/')) {
            storeName = 'reports-done-store'
            id = event.request.url.split('/').pop()
        }

        if (event.request.url.includes('/api/file') || event.request.url.includes('/api/reports')) {

            event.respondWith(
                fetch(event.request.clone())
                    .then((response) => {
                        if (response.status !== 201 && response.status !== 200) {
                            postMessageToClient(SERVER_OFFLINE)
                            if (storeName === 'reports-done-store')
                                saveToIndexedDB({ id }, storeName, false);
                            else
                                saveToIndexedDB(event.request.clone(), storeName);
                            return new Response(JSON.stringify({ status: 'saved' }));
                        } else {
                            postMessageToClient(SERVER_ONLINE)
                            return response;
                        }
                    })
                    .catch((err) => {
                        postMessageToClient(SERVER_OFFLINE)
                        if (storeName === 'reports-done-store')
                            saveToIndexedDB({ id }, storeName, false);
                        else
                            saveToIndexedDB(event.request.clone(), storeName);
                        return new Response(JSON.stringify({ status: 'saved' }));
                    })
            );
            return;
        }

        event.respondWith(
            fetch(event.request.clone())
                .then((response) => {
                    postMessageToClient(SERVER_ONLINE)
                    return response
                })
                .catch(() => {
                    postMessageToClient(SERVER_OFFLINE)
                    return new Response()
                })
        )
    }
})

// save to indexedDB for 'api/file' requests
async function saveToIndexedDB(data, storeName, json = true) {
    const object = json ? await data.json() : data;
    saveObject(object, storeName)
        .then(() => {
            console.log('Saved to indexedDB')
        })
        .catch((err) => {
            console.log('Save to indexedDB failed: ', err)
        })
}

// background sync
async function syncStores(storeName, url) {
    const objects = await getAll(storeName);
    for (const item of objects) {
        console.log('Syncing item: ', item.key);
        let response;
        if (storeName === 'reports-done-store')
            response = await API.makePost(url + item.value.id);
        else
            response = await API.makePost(url, item.value);

        if (response.status === 'success') await deleteObject(storeName, item.key);
    };
}

async function syncNearmisses() {
    for (const store of STORES) {
        console.log('Syncing store: ', store.name, ' url:', store.url);
        await syncStores(store.name, store.url);
    }
}

self.addEventListener('sync', async (event) => (event.tag === 'nearmiss-sync') && await syncNearmisses());



// // fetch server status
// async function isServerOnline() {
//     try {
//         const response = await fetch('/api/status')
//         return response.ok
//     } catch (error) {
//         return false
//     }
// }

// // check if client is visible and return true or false
// function isClientVisible() {
//     return clients
//         .matchAll({
//             type: 'window',
//             includeUncontrolled: true,
//         })
//         .then((windowClients) => {
//             let clientIsVisible = false
//             for (let i = 0; i < windowClients.length; i++) {
//                 const windowClient = windowClients[i]
//                 if (windowClient.visibilityState === 'visible') {
//                     clientIsVisible = true
//                     break
//                 }
//             }
//             return clientIsVisible
//         })
//         .catch((err) => {
//             console.error('Error calling clients.matchAll', err)
//             return false
//         })
// }

// // delete '/api/reports/' cache if respond header date is older than 15 minutes
// async function deleteOldReportsCache() {
//     if (!(await caches.has(CURRENT_CACHES.api_reports))) return
//     const cache = await caches.open(CURRENT_CACHES.api_reports)
//     const keys = await cache.keys()
//     const now = new Date()
//     const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000)
//     const keysToFetch = keys.filter(async (key) => {
//         const response = await cache.match(key)
//         const responseDate = new Date(response.headers.get('date'))
//         if (responseDate < fifteenMinutesAgo && key.url.indexOf('/api/reports/') !== -1) return true
//         else return false
//     })
//     keysToFetch.forEach((key) => {
//         cache.delete(key)
//     })
// }

// // periodically every 15 minutes fetch old reports cache
// setInterval(deleteOldReportsCache, 900000)