"use client";
import useVisualizrStore from "@/util/store/use-visualizr-store";
import {
  IconDatabaseExport,
  IconDeviceFloppy,
  IconFileImport,
} from "@tabler/icons-react";
import Image from "next/image";
import { AppBarButton } from "./AppBarButton";

export function AppBar() {
  const { onSave, onLoad, onImport, onExport, addNotification } =
    useVisualizrStore();

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
