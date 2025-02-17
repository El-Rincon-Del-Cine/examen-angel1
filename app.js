if ('serviceWorker' in navigator && 'PushManager' in window) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('Service Worker registrado con éxito:', registration.scope);

                // Aqui solicita permiso para enviar mi notificacion
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        console.log('Notificaciones permitidas.');
                        registration.showNotification('Gracias por suscribirte a La Taverna del Café');
                    } else {
                        console.warn('El usuario denegó las notificaciones.');
                    }
                });
            })
            .catch(error => {
                console.error('Error al registrar el Service Worker:', error);
            });
    });
}
