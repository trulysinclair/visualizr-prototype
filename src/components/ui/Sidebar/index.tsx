import { PSQLDataTypes } from "@/types/postgresql";
import { TableNode } from "@/types/table";
import useVisualizrStore from "@/util/store/use-visualizr-store";
import { useEffect, useState } from "react";
import { Edge, Panel, useOnSelectionChange } from "reactflow";
import { SidebarInput } from "./SidebarInput";
import { SidebarConstraints } from "./SidebarConstraints";
import { SidebarType } from "./SidebarType";

export const hoverIconWidth = 24;

export const Sidebar = () => {
  const { onSelectionChange, table, updateNode, addColumn, updateColumn } =
    useVisualizrStore();
  const [selectedNode, setSelectedNode] = useState<TableNode | null>(null);

  // When the user selects a node, update the sidebar
  useOnSelectionChange({
    onChange: ({ nodes, edges }: { nodes: TableNode[]; edges: Edge[] }) => {
      onSelectionChange({ nodes, edges });
      setSelectedNode(nodes[0] ?? null);
    },
  } as any);

  useEffect(() => {
    if (table != null && selectedNode != null) {
      // if switching between nodes, update the old one
      updateNode(table.id, table.data);
    }
  }, [table, selectedNode, updateNode]);

  return (
    <Panel
      position="top-right"
      className="top-1/2 flex h-[70%] max-h-[70%] -translate-y-1/2 items-center"
    >
      <div className="h-full w-[28rem] space-y-2 overflow-hidden rounded-2xl bg-primary p-4 text-white shadow-md">
        {table != null ? (
          <form className="flex flex-col space-y-4">
            <SidebarInput name="Name" property="title" />
            <SidebarInput name="Description" property="description" />
            <div className="scrollbar:bg-transparent h-96 scroll-m-0 overflow-y-scroll rounded-lg py-2 scrollbar-none hover:shadow-inner hover:shadow-secondary ">
              <div className="space-y-2 rounded text-black">
                {table.data.columns.map((column, index) => (
                  <div key={index} className="flex space-x-2">
                    <SidebarInput
                      name="Name"
                      property="title"
                      column={column}
                    />
                    <SidebarConstraints column={column} />
                    <SidebarType column={column} />
                  </div>
                ))}
              </div>
            </div>
            <div
              className="flex cursor-cell justify-center border-2 border-dashed border-input-background px-2 py-1 text-sm text-gray-400 duration-75 hover:border-accent-green hover:bg-accent-green/50 hover:text-white"
              onClick={() => {
                if (!selectedNode) return;

                addColumn({
                  id: `${table.id}-${table.data.columns.length + 1}`,
                  name: "new_column",
                  type: PSQLDataTypes.TEXT,
                  isNullable: true,
                  isAutoIncrement: false,
                  isUnique: false,
                  isPrimaryKey: false,
                  foreignKey: null,
                  defaultValue: "",
                  description: "",
                });
              }}
            >
              Add Column
            </div>
          </form>
        ) : (
          <div className="text-center">No node selected</div>
        )}
      </div>
    </Panel>
  );
};
