"use client";
import clsx from "clsx";
import { cloneElement, DragEvent } from "react";

export type DropToolProps = {
  icon: React.ReactElement;
  type: "table" | "function" | "trigger";
  className?: string;
};

export function DropTool({ icon, type, className }: DropToolProps) {
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="flex cursor-pointer items-center space-x-2 rounded-md bg-input-background/50 p-2 text-gray-100 hover:bg-input-background"
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      {cloneElement(icon, {
        className: clsx("h-5 w-5", className),
      })}
      <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
    </div>
  );
}
