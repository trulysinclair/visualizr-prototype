"use client";
import { Squares2X2Icon, TableCellsIcon } from "@heroicons/react/24/outline";
import { Panel } from "reactflow";
import { DropTool } from "../drop-tool";

export const Toolbar = () => (
  <Panel position="top-left" className="top-1/2 flex items-center">
    <div className="space-y-2 rounded-2xl bg-primary p-4 text-black shadow-md">
      <DropTool type="table" icon={<TableCellsIcon className="h-6 w-6" />} />
      <DropTool type="table" icon={<Squares2X2Icon className="h-6 w-6" />} />
    </div>
  </Panel>
);
