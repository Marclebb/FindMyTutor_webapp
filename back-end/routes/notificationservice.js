/*const admin = require('firebase-admin');

// Function to send FCM notifications
const sendNotification = async (fcmToken, title, body) => {
    const message = {
        notification: {
            title: title,
            body: body
        },
        token: fcmToken
    };

    try {
        const response = await admin.messaging().send(message);
        console.log('Notification sent successfully:', response);
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};

module.exports = { sendNotification };
*/