import useNotificationStore from "@/util/stores/notification-store";
import { Transition } from "@headlessui/react";
import * as Toast from "@radix-ui/react-toast";
import { log } from "console";
import { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { shallow } from "zustand/shallow";
import Notification from "./notification";

type NotificationWrapperProps = {
  children?: ReactNode;
  duration: number;
};

const NotificationWrapper = (props: NotificationWrapperProps) => {
  // const [show, setShow] = useState(false);

  const { notifications, removeNotification } = useNotificationStore(
    (state) => ({
      notifications: state.notifications,
      removeNotification: state.removeNotification,
    }),
    shallow
  );

  // TODO: Make sure that notifications are timed out in the order they were added instead of removing all notifications at once
  useEffect(() => {
    // if (notifications.length > 0) {
    // setShow(true);
    // }

    if (notifications.length > 0)
      setTimeout(() => {
        // setShow(false);
        removeNotification(notifications[0]);
      }, props.duration);
  }, [notifications, props.duration, removeNotification]);

  const renderNotification = () => {
    if (notifications.length > 0) {
      return notifications.map((notification, index) => (
        <Notification
          key={index}
          title={notification.title}
          message={notification.message}
          type={notification.type}
          onDismiss={() => {
            removeNotification(notification);
            // setShow(false);
          }}
        />
      ));
    }
  };

  return (
    <Toast.Provider duration={props.duration} swipeDirection="right">
      {renderNotification()}
      <Toast.Viewport className="fixed top-0 right-0 z-20 space-y-2 p-4" />
    </Toast.Provider>
  );
};

export default NotificationWrapper;
