document.getElementById('notificar').addEventListener('click', async () => {
    // Verifica si el navegador soporta notificaciones
    if (!("Notification" in window) || !("serviceWorker" in navigator)) {
        alert("Las notificaciones no son compatibles con tu navegador.");
        return;
    }

    // Pedir permiso al usuario
    const permiso = await Notification.requestPermission();

    if (permiso === "granted") {
        navigator.serviceWorker.ready.then(registration => {
            registration.active.postMessage({ type: 'SHOW_NOTIFICATION' });
        });
    } else {
        alert("No podemos enviarte notificaciones sin tu permiso.");
    }
});
