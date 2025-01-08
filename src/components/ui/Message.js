import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);

    const showNotification = (message, type = "info") => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000); // Скрыть уведомление через 3 секунды
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            {notification && (
                <div
                    className={`fixed bottom-5 right-5 px-4 py-2 rounded-lg shadow-lg text-white transition transform
                    ${
                                    notification.type === "success"
                                        ? "bg-green-500"
                                        : notification.type === "error"
                                            ? "bg-red-500"
                                            : "bg-blue-500"
                                }
                    ${notification ? "animate-fadeIn" : "animate-fadeOut"}
                        `}
                            >
                    {notification.message}
                </div>

            )}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
