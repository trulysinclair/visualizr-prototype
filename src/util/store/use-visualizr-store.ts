import createSelectors from "@/util/create-selectors";
import createAppSlice, { AppSlice } from "@/util/store/app-slice";
import createNotificationSlice, {
  NotificationSlice,
} from "@/util/store/notification-slice";
import createTableSlice, { TableSlice } from "@/util/store/table-slice";
import { create, StateCreator } from "zustand";

export type Store = NotificationSlice & AppSlice & TableSlice;
export type Slice<T> = StateCreator<Store, [], [], T>;

const useVisualizrStore = create<Store>((...all) => ({
  ...createAppSlice(...all),
  ...createTableSlice(...all),
  ...createNotificationSlice(...all),
}));

export default createSelectors(useVisualizrStore)