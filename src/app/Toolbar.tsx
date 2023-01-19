"use client";
import { Squares2X2Icon, TableCellsIcon } from "@heroicons/react/24/outline";
import { Panel } from "reactflow";
import { DropTool } from "./DropTool";

export const Toolbar = () => (
  <Panel position="top-left" className="!inset-y-0 !left-0 flex items-center">
    <div className="space-y-2 rounded-2xl border bg-gray-100 p-4 text-black shadow-md">
      <DropTool icon={<TableCellsIcon className="h-6 w-6" />} />
      <DropTool icon={<Squares2X2Icon className="h-6 w-6" />} />
    </div>
  </Panel>
);
