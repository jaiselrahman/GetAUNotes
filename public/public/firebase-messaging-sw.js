importScripts('https://www.gstatic.com/firebasejs/6.3.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/6.3.0/firebase-messaging.js')

firebase.initializeApp({
    messagingSenderId: "356772075988"
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    var url = location.protocol + "//" + location.host + payload.data.url
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        data: { url: url }
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
    let url = event.notification.data.url;
    event.notification.close(); // Android needs explicit close.
    event.waitUntil(
        clients.matchAll({ type: "window" }).then(windowClients => {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === url && "focus" in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});