import { Alert, Stack } from "@mui/material";
import { createContext, PropsWithChildren, useContext, useState } from "react";

import { createSxStyles } from "~utils/createSxStyles.ts";
import { createUUID } from "~utils/createUUID.ts";

const NOTIFICATION_EXPIRATION_TIME = 5000;

type NotificationType = "error" | "success" | "warning" | "info";

interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}

interface NotificationContext {
  createNotification: (message: string, type?: NotificationType) => void;
}

const NotificationContext = createContext({} as NotificationContext);

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationContextProvider = ({ children }: PropsWithChildren) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const createNotification = (message: string, type: NotificationType = "success") => {
    const newNotificationId = createUUID();

    setNotifications((prev) => [...prev, { message, type, id: newNotificationId }]);

    setTimeout(() => {
      deleteNotification(newNotificationId);
    }, NOTIFICATION_EXPIRATION_TIME);
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== notificationId));
  };

  return (
    <NotificationContext.Provider value={{ createNotification }}>
      {children}
      <Stack sx={notificationStyles.container} gap={2}>
        {notifications.map((notification) => (
          <Alert sx={notificationStyles.alert} severity={notification.type} key={notification.id}>
            {notification.message}
          </Alert>
        ))}
      </Stack>
    </NotificationContext.Provider>
  );
};

const notificationStyles = createSxStyles({
  container: {
    position: "absolute",
    right: 15,
    bottom: 15,
  },
  alert: {
    minWidth: "20rem",
  },
});
