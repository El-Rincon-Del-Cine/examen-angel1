var CACHE_NAME = 'v1';
var cacheFiles = [
                '/',
                '/index.html',
                '/css/style.css',
                '/manifest.json',
                '/productos.html',
                '/galeria.html',
                '/nosotros.html',
                '/contacto.html',
                '/img/atendiendo2.jpg',
                '/img/cafe2.jpg',
                '/img/cafe3.jpg',
                '/img/cafe4.jpg',
                '/img/cafe1.jpg',
                '/img/icono1.png',
                '/img/icono2.png',
                '/img/movil.png',
                '/img/pc.PNG',
                '/img/cafeteria.jpg',
                '/img/capuccino.jpg',
                '/img/latte.jpg',
                '/img/chocolate-caliente.jpg',
                '/img/contacto.jpg',
                '/img/croissant.jpg',
                '/img/espresso.jpeg',
                '/img/frappe.jpg',
                '/img/gal1.jpg',
                '/img/gal2.jpg',
                '/img/granos.jpg',
                '/img/hero.jpg',
                '/img/leyendo.jpeg',
                '/img/mokaccino.jpg',
                '/img/panecillos.jpg',
                '/img/personal.jpg',
                '/img/preparando.jpg',
                '/img/snacks.jpg'
]

//instalación del SW en mi página
self.addEventListener('install', function(e) {
    console.log('Service Worker: Instalado');
    e.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('Service Worker: Cache abierto');
            return cache.addAll(cacheFiles);
        })
    )
})

//Activa el cacheo o en caso contrario me reemplaza el anterior
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

//fetch: busqueda de archivos en la cache
self.addEventListener('fetch', function(e) {
    console.log('Service Worker: Fetching', e.request.url);
    
    e.respondWith(
        caches.match(e.request).then(function(response) {
            if(response) {
                console.log('Archivo encontrado', e.request.url);
                return response;
            }
            var requestClone = e.request.clone();
            fetch(requestClone).then(function(response) {
                if(!response){
                    console.log('No se encontro el archivo en la cache');
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
