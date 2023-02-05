"use client";
import useAppStore, { ActionDispatcher } from "@/util/stores/app-store";
import useNotificationStore, { Notification } from "@/util/stores/notification-store";
import {
  IconDatabaseExport,
  IconDeviceFloppy,
  IconFileImport,
} from "@tabler/icons-react";
import clsx from "clsx";
import Image from "next/image";
import React, { cloneElement } from "react";
import { shallow } from "zustand/shallow";

type AppBarButtonProps = {
  action: ActionDispatcher<HTMLButtonElement>;
  name: string;
  icon: React.ReactElement;
  notifier: (notification: Notification) => void;
  className?: string;
};

const AppBarButton = ({
  action,
  notifier,
  name,
  icon,
  className,
}: AppBarButtonProps) => (
  <button
    className="flex items-center space-x-2 rounded-md bg-input-background/50 p-2 text-white hover:bg-input-background"
    onClick={(event) => action(event, notifier)}
  >
    {cloneElement(icon, {
      className: clsx("h-5 w-5", className),
    })}
    <span>{name}</span>
  </button>
);

export function AppBar() {
  const { onSave, onLoad, onImport, onExport } = useAppStore(
    (state) => ({
      onSave: state.onSave,
      onLoad: state.onLoad,
      onImport: state.onImport,
      onExport: state.onExport,
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
    <div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 justify-center">
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
      <div className="flex space-x-2 rounded-b-2xl bg-primary p-4 text-white">
        <AppBarButton
          icon={<IconDeviceFloppy />}
          name="Save"
          action={onSave}
          notifier={addNotification}
          className="text-blue-400"
        />
        <AppBarButton
          icon={<IconFileImport />}
          name="Import"
          action={onLoad}
          notifier={addNotification}
          className="text-indigo-400"
        />
        <AppBarButton
          icon={<IconDatabaseExport />}
          name="Export"
          action={onExport}
          notifier={addNotification}
          className="text-accent-green"
        />
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
