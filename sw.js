self.addEventListener('install', (event) => {
    console.log('Service Worker: Instalado');
    event.waitUntil(
        caches.open('cafe')
            .then((cache) => {
                return Promise.all([
                './',
                './index.html',
                './css/style.css',
                './manifest.json',
                './productos.html',
                './galeria.html',
                './nosotros.html',
                './contacto.html',
                './img/atendiendo2.jpg',
                './img/cafe2.jpg',
                './img/cafe3.jpg',
                './img/cafe4.jpg',
                './img/cafe1.jpg',
                './img/icono1.png',
                './img/icono2.png',
                './img/cafeteria.jpg',
                './img/capuccino.jpg',
                './img/latte.jpg',
                './img/chocolate-caliente.jpg',
                './img/contacto.jpg',
                './img/croissant.jpg',
                './img/espresso.jpeg',
                './img/frappe.jpg',
                './img/gal1.jpg',
                './img/gal2.jpg',
                './img/granos.jpg',
                './img/hero.jpg',
                './img/leyendo.jpeg',
                './img/mokaccino.jpg',
                './img/panecillos.jpg',
                './img/personal.jpg',
                './img/preparando.jpg',
                './img/snacks.jpg',
                './sw.js',
                './app.js'
                                       
                ]);
            })
    );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
    const cacheWhitelist = ['Icecream-Store-PWA'];
    console.log('Service Worker: Activado');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch
self.addEventListener('fetch', (event) => {
    console.log('Service Worker: Fetch solicitado para', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Devuelve el recurso desde el caché si está disponible
                if (response) {
                    return response;
                }
                // Si no está en caché, realiza una solicitud de red
                return fetch(event.request);
            })
            .catch((error) => console.error('Error en la solicitud fetch', error))
    );
});