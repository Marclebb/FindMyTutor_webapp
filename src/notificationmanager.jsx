import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { showLocalNotification } from './notification';

function NotificationsManager() {
    const [notifications, setNotifications] = useState([]);

    const checkForNotifications = () => {
        axios.get('http://localhost:3001/matchesRoutes/check-notifications', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            },
        })
        .then((res) => {
            if (res.data.notifications && res.data.notifications.length > 0) {
                setNotifications(res.data.notifications);
                res.data.notifications.forEach(notification => {
                    showLocalNotification(notification.title, notification.body);
                });
            }
        })
        .catch((error) => {
            console.error('Error checking for notifications:', error);
        });
    };

    useEffect(() => {
        // Check for notifications immediately when the component mounts
        checkForNotifications();

        // Set up an interval to check for notifications every 5 minutes
        const intervalId = setInterval(checkForNotifications, 5 * 60 * 1000);

        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return null; // This component doesn't render anything
}

export default NotificationsManager;