if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((registration) => {
                console.log('Service Worker registrado con éxito:', registration.scope);

                navigator.serviceWorker.ready.then((reg) => {
                    document.getElementById('notificar').addEventListener('click', async () => {
                        if (!("Notification" in window)) {
                            alert("Las notificaciones no son compatibles con tu navegador.");
                            return;
                        }

                        const permiso = await Notification.requestPermission();
                        if (permiso === "granted") {
                            reg.active?.postMessage({ type: 'SHOW_NOTIFICATION' });
                            //enviara una notifiación cada minuto dentro de la app
                            setInterval(() => {
                                if (navigator.serviceWorker.controller) {
                                    navigator.serviceWorker.controller.postMessage({ type: 'SHOW_NOTIFICATION' });
                                }
                            }, 60000);

                        } else {
                            alert("No podemos enviarte notificaciones sin tu permiso.");
                        }
                    });
                });
            })
            .catch((error) => {
                console.error('Error al registrar el Service Worker:', error);
            });
    });
}
