if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((registration) => {
                console.log('Service Worker registrado:', registration.scope);

                document.getElementById('notificar').addEventListener('click', async () => {
                    console.log("Botón presionado. Pidiendo permisos...");

                    const permiso = await Notification.requestPermission();
                    console.log("Permiso recibido:", permiso);

                    if (permiso === "granted") {
                        console.log("Permiso concedido. Enviando notificación en 1 minuto...");

                        setTimeout(() => {
                            if (navigator.serviceWorker.controller) {
                                console.log("Enviando notificación desde SW...");
                                navigator.serviceWorker.controller.postMessage({ type: 'SHOW_NOTIFICATION' });
                            } else {
                                console.warn("No hay Service Worker activo.");
                            }
                        }, 60000); //60000ms son 1 minuto

                    } else {
                        console.warn("⚠Permiso denegado.");
                        alert("No podemos enviarte notificaciones sin tu permiso.");
                    }
                });

            })
            .catch((error) => {
                console.error('Error al registrar el SW:', error);
            });
    });
}
