"use client";
import { IconDragDrop, IconTable } from "@tabler/icons-react";
import { Panel } from "reactflow";
import { DropTool } from "./DropTool";

export const Toolbar = () => (
  <Panel
    position="bottom-center"
    className="left-1/2 -mx-0 -translate-x-1/2 rounded-2xl bg-primary p-4 text-center shadow-md"
  >
    <h2 className="mb-2 inline-flex font-medium text-gray-200">
      <IconDragDrop className="mr-2" /> Droppables
    </h2>
    <div className="flex justify-center space-x-2 text-black ">
      <DropTool type="table" icon={<IconTable />} className="" />
      {/* <DropTool
        type="function"
        icon={<IconFunction />}
        className="disabled:opacity-50"
      />
      <DropTool type="trigger" icon={<IconBolt />} className="" /> */}
    </div>
  </Panel>
);
