import Hover from "@/components/nodes/table/hover";
import { PSQLDataTypes } from "@/types/postgresql";
import { TableNode } from "@/types/table";
import useVisualizrStore from "@/util/store/use-visualizr-store";
import { snakeCasePattern, spaceToUnderscore } from "@/util/string-validation";
import {
  ExclamationCircleIcon,
  FingerPrintIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { IconKey, IconExclamationCircle, IconDelta } from "@tabler/icons-react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Edge, Panel, useOnSelectionChange } from "reactflow";
import { SidebarInput } from "./input";

const hoverIconWidth = 24;

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
                      spellCheck="false"
                      pattern={snakeCasePattern}
                      value={column.name}
                      className="w-full rounded bg-secondary p-1 font-mono text-lg font-medium text-gray-400 invalid:text-accent-red"
                      onChange={(event) => {
                        updateColumn({
                          ...column,
                          name: spaceToUnderscore(event.target.value),
                        });
                      }}
                    />
                    <div className="flex justify-center space-x-1">
                      <Hover
                        title="PRIMARY KEY"
                        width={hoverIconWidth}
                        icon={
                          <IconKey
                            height={24}
                            className={clsx(
                              "opacity-70 group-hover/column:opacity-100",
                              column.isPrimaryKey
                                ? "text-amber-400"
                                : "text-input-background"
                            )}
                          />
                        }
                        onClick={() =>
                          updateColumn({
                            ...column,
                            isPrimaryKey: !column.isPrimaryKey,
                          })
                        }
                      />
                      <Hover
                        title="NOT NULL"
                        width={hoverIconWidth}
                        icon={
                          <IconExclamationCircle
                            height={24}
                            className={clsx(
                              "opacity-70 group-hover/column:opacity-100",
                              column.isNullable
                                ? "text-accent-red"
                                : "text-input-background"
                            )}
                          />
                        }
                        onClick={() =>
                          updateColumn({
                            ...column,
                            isNullable: !column.isNullable,
                          })
                        }
                      />
                      <Hover
                        title="UNIQUE"
                        width={hoverIconWidth}
                        icon={
                          <IconDelta
                            height={24}
                            className={clsx(
                              "opacity-70 group-hover/column:opacity-100",
                              column.isUnique
                                ? "text-accent-green"
                                : "text-input-background"
                            )}
                          />
                        }
                        onClick={() =>
                          updateColumn({
                            ...column,
                            isUnique: !column.isUnique,
                          })
                        }
                      />
                    </div>
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
