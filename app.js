if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((registration) => {
                console.log('Service Worker registrado con éxito:', registration.scope);

                //esto muestra una ventana para permitir notificaciones
                if ('Notification' in window) {
                    Notification.requestPermission().then((result) => {
                        if (result === 'granted') {
                            console.log('Permiso de notificaciones concedido');
                        } else {
                            console.warn('Permiso de notificaciones denegado');
                        }
                    });
                }
            })
            .catch((error) => {
                console.error('Error al registrar el Service Worker:', error);
            });
    });
}
