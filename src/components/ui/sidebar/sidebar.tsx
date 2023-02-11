import { PSQLDataTypes } from "@/types/postgresql";
import { TableNode } from "@/types/table";
import useVisualizrStore from "@/util/store/use-visualizr-store";
import { useEffect, useState } from "react";
import { Edge, Panel, useOnSelectionChange } from "reactflow";
import { SidebarInput } from "./input";

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
      className="0 top-1/2 flex w-96 -translate-y-1/2 items-center"
    >
      <div className="space-y-2 rounded-2xl bg-primary p-4 text-white shadow-md">
        {table != null ? (
          <form className="flex flex-col space-y-4">
            <SidebarInput name="Name" property="title" />
            <SidebarInput name="Description" property="description" textarea />
            <div>
              <label htmlFor="columns">Columns</label>
              <div className="space-y-2 rounded text-black">
                {table.data.columns.map((column, index) => (
                  <div key={index} className="grid grid-cols-3 space-x-2">
                    <input
                      type="text"
                      name="column"
                      id="column"
                      value={column.name}
                      className="w-full rounded bg-secondary p-1 font-mono text-lg font-medium text-gray-400"
                      onChange={(event) => {
                        updateColumn({ ...column, name: event.target.value });
                      }}
                    />
                    <input
                      type="text"
                      name="column"
                      id="column"
                      value={column.type}
                      className="rounded"
                      onChange={(event) => {}}
                    />
                  </div>
                ))}
                <div
                  className="flex cursor-cell justify-center border-2 border-dashed border-input-background px-2 py-1 text-sm text-gray-400 duration-75 hover:border-accent-green hover:bg-accent-green/50 hover:text-white"
                  onClick={() => {
                    if (!selectedNode) return;

                    addColumn({
                      id: `${selectedNode.id}-${
                        selectedNode.data.columns.length + 1
                      }`,
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
              </div>
            </div>
          </form>
        ) : (
          <div className="text-center">No node selected</div>
        )}
      </div>
    </Panel>
  );
};
