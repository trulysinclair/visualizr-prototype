"use client";
import useAppStore from "@/util/app-store";
import useNotificationStore from "@/util/notification-store";
import Image from "next/image";
import { shallow } from "zustand/shallow";

export function SurfaceAppbar() {
  const { onSave, onLoad } = useAppStore(
    (state) => ({
      onSave: state.onSave,
      onLoad: state.onLoad,
    }),
    shallow
  );

  const { addNotification } = useNotificationStore(
    (state) => ({
      addNotification: state.addNotification,
    }),
    shallow
  );

  return (
    <div className="absolute inset-x-0 top-0 z-10 flex justify-center">
      {/* Rounded cutout */}
      <Image
        src="/corner.svg"
        alt="curve"
        className="h-4 w-4 rotate-90"
        width={24}
        height={24}
        priority
      />
      {/* The main area */}
      <div className="flex space-x-2 rounded-b-2xl bg-black p-4 text-white">
        <button onClick={(event) => onSave(event, addNotification)}>
          Save
        </button>
        <button onClick={(event) => onLoad(event, addNotification)}>
          Load
        </button>
      </div>
      {/* Rounded cutout */}
      <Image
        src="/corner.svg"
        alt="curve"
        className="h-4 w-4"
        width={24}
        height={24}
        priority
      />
    </div>
  );
}
