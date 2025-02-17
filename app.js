if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js', {scope: './'})
        .then(function(registration){
            console.log('Service Worker logrado felicidades!!', registration);
        })
        .catch(function(error) {
            console.log('Error al registrar el service worker', error);
        });
    }