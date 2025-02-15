if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js', {scope: './'})
        .then(function(registration){
            console.log('Services Worker registrado felicidades!!', registration);
        })
        .catch(function(error) {
            console.log('Error al registrar el service worker', error);
        });
    }