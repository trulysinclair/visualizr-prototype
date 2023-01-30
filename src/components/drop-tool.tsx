"use client";
import { DragEvent } from "react";

export type DropToolProps = {
  icon: React.ReactNode;
  type: string;
};

export function DropTool({ icon,type }: DropToolProps) {
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="flex h-10 w-10 items-center justify-center rounded bg-input-background/50 p-2 text-gray-300 shadow duration-150 hover:cursor-pointer hover:bg-input-background hover:text-white"
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      {icon}
    </div>
  );
}
