"use client";
import { ActionDispatcher } from "@/util/store/app-slice";
import { Notification } from "@/util/store/notification-slice";
import clsx from "clsx";
import React, { cloneElement } from "react";

type AppBarButtonProps = {
  action: ActionDispatcher<HTMLButtonElement>;
  name: string;
  icon: React.ReactElement;
  notifier: (notification: Notification) => void;
  className?: string;
};
export const AppBarButton = ({
  action, notifier, name, icon, className,
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
