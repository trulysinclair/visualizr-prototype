import { AppSlice } from "@/util/store/app-slice";
import { NotificationSlice } from "@/util/store/notification-slice";
import { TableSlice } from "@/util/store/table-slice";
import { StateCreator } from "zustand";


export type Store = NotificationSlice & AppSlice & TableSlice;
export type Slice<T> = StateCreator<Store, [], [], T>;
