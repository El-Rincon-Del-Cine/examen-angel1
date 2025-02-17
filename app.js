if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js') 
            .then((registration) => {
                console.log('Service Worker registrado con éxito:', registration.scope);

                // Una vez que el Service Worker esté listo, activamos el botón
                document.getElementById('notificar').addEventListener('click', async () => {
                    if (!("Notification" in window)) {
                        alert("Las notificaciones no son compatibles con tu navegador.");
                        return;
                    }

                    const permiso = await Notification.requestPermission();
                    if (permiso === "granted") {
                        registration.active.postMessage({ type: 'SHOW_NOTIFICATION' });
                    } else {
                        alert("No podemos enviarte notificaciones sin tu permiso.");
                    }
                });

            })
            .catch((error) => {
                console.error('Error al registrar el Service Worker:', error);
            });
    });
}
