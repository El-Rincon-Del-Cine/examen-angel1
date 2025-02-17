if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(registration => {
            console.log('Service Worker registrado:', registration);
            return Notification.requestPermission();
        })
        .then(permission => {
            if (permission === 'granted') {
                console.log('Permiso de notificaciones concedido');

                // Cuando la página se carga, me dira si deseo permitir notificaciones
                navigator.serviceWorker.ready.then(registration => {
                    registration.active.postMessage({ type: 'SHOW_NOTIFICATION' });
                });
            } else {
                console.warn('Permiso de notificaciones denegado');
            }
        })
        .catch(error => console.error('Error al registrar el Service Worker:', error));
}
