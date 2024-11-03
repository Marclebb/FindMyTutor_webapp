// firebaseNotification.js or notifications.js

export const requestNotificationPermission = () => {
    return new Promise((resolve, reject) => {
        if (!('Notification' in window)) {
            return reject(new Error('This browser does not support notifications.'));
        }

        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                resolve();
            } else {
                reject(new Error('Notification permission denied'));
            }
        }).catch((error) => {
            reject(error);
        });
    });
};

export const showLocalNotification = (title, body) => {
    if (Notification.permission === 'granted') {
        const options = {
            body: body,
            icon: './assets/scholarship.png', // Add your own icon here
        };
        new Notification(title, options);
    } else {
        console.error("Notification permission is not granted.");
    }
};
