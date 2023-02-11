import createSelectors from "@/util/store/create-selectors";
import createAppSlice from "@/util/store/app-slice";
import createNotificationSlice from "@/util/store/notification-slice";
import createTableSlice from "@/util/store/table-slice";
import { create } from "zustand";
import { Store } from "../../types/store";
import { logger } from "./store-logger";

const useVisualizrStore = create<Store>(
  logger(
    (...all) => ({
      ...createAppSlice(...all),
      ...createTableSlice(...all),
      ...createNotificationSlice(...all),
    }),
    "Visualizr"
  )
);

export default createSelectors(useVisualizrStore);
