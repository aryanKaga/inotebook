import React, { useState } from "react";
import { IoNotificationsOutline, IoClose } from "react-icons/io5";
import "./Notification.css"; // Import updated CSS

function Notification() {
    const [notifications, setNotifications] = useState([
        "New message received",
        "System update available",
        "Reminder: Meeting at 3 PM",
        "New message received",
        "System update available",
        "Reminder: Meeting at 3 PM","New message received",
        "System update available",
        "Reminder: Meeting at 3 PM","New message received",
        "System update available",
        "Reminder: Meeting at 3 PM","New message received",
        "System update available",
        "Reminder: Meeting at 3 PM"
    ]);

    const removeNotification = (index) => {
        setNotifications(notifications.filter((_, i) => i !== index));
    };

    return (
        <div className="notification-container">
            <div className="notification-header">
                <IoNotificationsOutline className="notification-icon" />
                <h2>Notifications</h2>
            </div>
            <ul className="notification-list">
                {notifications.length > 0 ? (
                    notifications.map((note, index) => (
                        <li key={index} className="notification-item">
                            <span>{note}</span>
                            <button className="close-btn" onClick={() => removeNotification(index)}>
                                <IoClose className="close-icon" />
                            </button>
                        </li>
                    ))
                ) : (
                    <li className="notification-empty">No new notifications</li>
                )}
            </ul>
        </div>
    );
}

export default Notification;
