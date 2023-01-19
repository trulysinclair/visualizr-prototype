"use client";
import { DragEvent } from "react";

export type DropToolProps = {
  icon: React.ReactNode
};

export function DropTool({ icon }: DropToolProps) {

  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="flex h-10 w-10 items-center justify-center rounded bg-white p-2 shadow"
      onDragStart={(event) => onDragStart(event, "custom")}
      draggable
    >
      {icon}
    </div>
  );
}
