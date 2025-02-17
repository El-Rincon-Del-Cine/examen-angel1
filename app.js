if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(registration => {
            console.log('Service Worker registrado:', registration);
            return Notification.requestPermission();
        })
        .then(permission => {
            if (permission === 'granted') {
                console.log('Permiso de notificaciones concedido');
            } else {
                console.warn('Permiso de notificaciones denegado');
            }
        })
        .catch(error => console.error('Error al registrar el Service Worker:', error));
}

function enviarNotificacion() {
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.getRegistration().then(registration => {
            if (registration) {
                registration.showNotification('Título de la Notificación', {
                    body: 'Este es el contenido de la notificación local.',
                    icon: './img/icono1.png'
                });
            }
        });
    }
}

document.getElementById('btnNotificar').addEventListener('click', enviarNotificacion);
