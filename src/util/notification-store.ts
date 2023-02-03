import { create } from "zustand";

export type Notification = {
  title: string;
  message: string;
  type: "success" | "error" | "info";
};

export type VisualizrNotificationState = {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (notification: Notification) => void;
};

const useNotificationStore = create<VisualizrNotificationState>((set) => ({
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
}));

export default useNotificationStore;
