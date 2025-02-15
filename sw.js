var CACHE_NAME = 'v1';
var cacheFiles = [
                './',
                './index.html',
                './estilos.css',
                './manifest.json',
                './oferta_educativa.html',
                './ofertaE.css',
                './plan.css',
                './plan.html',
                './Ubicacion.html',
                './Contactanos.html',
                './img/1.jpg',
                './img/2.jpg',
                './img/3.jpg',
                './img/4.jpg',
                './img/5.jpg',
                './img/actitud.png',
                './img/beca.png',
                './img/benemerita.png',
                './img/conocimiento.png',
                './img/escudo.png',
                './img/escuelasuperior.png',
                './img/graduacion.png',
                './img/icon.png',
                './img/icono1.png',
                './img/icono2.png',
                './img/inicio_cap.png',
                './img/itson.png',
                './img/logo_unam.png',
                './img/mujer-removebg-preview.png',
                './img/multitalentoso.png',
                './img/papeleria.png',
                './img/par_students-removebg-preview.png',
                './img/plan_cap.png',
                './img/planeta-tierra.png',
                './img/profesional.jpg',
                './img/public-service.png',
                './img/Software.jpg',
                './img/tia.jpg',
                './img/unam.jpg',
                './img/valor.png',
]

self.addEventListener('install', function(e) {
    console.log('Service Worker: Instalado');
    e.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('Service Worker: Cache abierto');
            return cache.addAll(cacheFiles);
        })
    )
})

self.addEventListener('activate', function(e) {
    console.log('Service Worker: Activado');
    e.waitUntil()(
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(thisCacheName) {
                   if(thisCacheName !== CACHE_NAME) {
                    console.log('Service Worker: Cache viejo eliminado', thisCacheName);
                    return caches.delete(thisCacheName);
                   }
            }))
        })
    )
})

self.addEventListener('fetch', function(e) {
    console.log('Service Worker: Fetching', e.request.url);
    
    e.respondWith(
        caches.match(e.request).then(function(response) {
            if(response) {
                console.log('Cache encontrada', e.request.url);
                return response;
            }
            var requestClone = e.request.clone();
            fetch(requestClone).then(function(response) {
                if(!response){
                    console.log('No se encontro respuesta');
                    return response;
                }
                var responseClone = response.clone();
                
                caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(e.request, responseClone);
                    return response;
                });
            })
            .catch(function(err){
                console.log('Error al hacer fetch', err);
            })
        })
    )
})