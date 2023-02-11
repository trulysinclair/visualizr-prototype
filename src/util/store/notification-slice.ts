import { Slice } from "@/types/store";

export type Notification = {
  title: string;
  message: string;
  type: "success" | "error" | "info";
};

export type NotificationSlice = {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (notification: Notification) => void;
};

const createNotificationSlice: Slice<NotificationSlice> = (set, get) => ({
  notifications: [],
  addNotification: (notification) => {
    set((state) => ({
      notifications: [...state.notifications, notification],
    }));
  },
  removeNotification: (notification) => {
    set((state) => ({
      notifications: state.notifications.filter(
        (n) => n.title !== notification.title
      ),
    }));
  },
});

export default createNotificationSlice;
