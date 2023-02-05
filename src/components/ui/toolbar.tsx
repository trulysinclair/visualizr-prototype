"use client";
import { IconTable } from "@tabler/icons-react";
import { Panel } from "reactflow";
import { DropTool } from "./drop-tool";

export const Toolbar = () => (
  <Panel
    position="bottom-center"
    className="left-1/2 -mx-0 -translate-x-1/2 rounded-2xl bg-primary p-4 text-center shadow-md"
  >
    <h2 className="mb-2 font-medium text-gray-200">Droppables</h2>
    <div className="flex space-x-2 text-black ">
      <DropTool type="table" icon={<IconTable />} className="" />
      {/* <DropTool type="function" icon={<IconFunction />} className="" /> */}
      {/* <DropTool type="trigger" icon={<IconAdjustments />} className="" /> */}
    </div>
  </Panel>
);
