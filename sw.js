self.addEventListener('install', (event) => {
    console.log('SW: Instalado');

    try {
        const respCacheAppShell = caches.open('cache-app-shell').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/script/app.js',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
                'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.5/dist/umd/popper.min.js',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.min.js',
                '/script/service.js',
            ]);
        });

        const service = caches.open('cache-service').then((cache) => {
            return cache.addAll([
                'https://reqres.in/api/users'
            ]);
        });

        event.waitUntil(Promise.all([respCacheAppShell, service]));

    } catch (err) {
        console.log(`error to install cache ${err}`)
    }
});


self.addEventListener('fetch', (event) => {
    const respCache = caches.match(event.request);

    const response = respCache.then((resp) => {
        
        if (resp) {
            return resp
        }
        
        return fetch(event.request.url)
    })

    event.respondWith(response);
})