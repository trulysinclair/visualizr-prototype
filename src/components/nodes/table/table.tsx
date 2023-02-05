import { PSQLDataTypes } from "@/types/postgresql";
import { ITable, TableNode } from "@/types/table";
import useVisualizrStore from "@/util/store/use-visualizr-store";
import clsx from "clsx";
import { memo, useEffect, useState } from "react";
import { NodeProps, useNodeId } from "reactflow";
import { v4 } from "uuid";
import TableColumn from "./column";

/**
 * A custom node which represents a table in a database.
 *
 * A table node has a title, a description, and a list of columns.
 * @see https://reactflow.dev/docs/api/node/
 */
const Table = ({ data, isConnectable, selected }: NodeProps<ITable>) => {
  // const { updateNode, getNode } = useAppStore((state) => ({
  //   updateNode: state.updateNode,
  //   getNode: state.getNode<TableNode>,
  // }));

  const { updateNode, getNode } = useVisualizrStore();

  const nodeId = useNodeId()!;
  const [columns, setColumns] = useState(
    getNode<TableNode>(nodeId).data.columns.concat()
  );

  const insertColumn = () => {
    const newColumn = {
      id: `${nodeId}-${columns.length++}`,
      name: "new_column",
      type: PSQLDataTypes.TEXT,
      isNullable: true,
      isAutoIncrement: false,
      isUnique: false,
      isPrimaryKey: false,
      foreignKey: null,
      defaultValue: "",
      description: "",
    };

    setColumns([
      // remove null and undefined values from the array, not sure why they are there, but they are. This is a hacky fix.
      ...columns.filter((item) => item != null && item != undefined),
      newColumn,
    ]);
  };

  // update columns in the store
  useEffect(() => {
    updateNode(nodeId, { columns });
  }, [columns, nodeId, updateNode, getNode]);

  return (
    <div
      className={clsx(
        "group cursor-auto rounded-lg border border-gray-800 bg-secondary shadow-md duration-200 hover:border-accent-orange focus-visible:outline-none",
        selected && "border-accent-orange"
      )}
    >
      <div
        id="drag-handle"
        className="flex shrink cursor-grab items-center justify-center rounded-t-lg bg-primary p-2 text-center text-sm font-normal text-white"
      >
        <input
          type="text"
          value={data.title}
          onChange={(event) =>
            updateNode(nodeId, { title: event.target.value })
          }
          className="flex shrink truncate rounded bg-secondary/70 text-center text-sm font-normal text-white focus:outline-none"
        />
      </div>

      {columns.length > 0 && columns
        ? columns.map((column, index) => (
            <TableColumn
              id={column?.id}
              key={v4()}
              setColumns={setColumns}
              parentNodeId={nodeId!}
              type={column?.type}
              defaultValue={column?.defaultValue}
              description={column?.description}
              length={column?.length}
              index={index}
              isNullable={column?.isNullable}
              isAutoIncrement={column?.isAutoIncrement}
              isUnique={column?.isUnique}
              foreignKey={column?.foreignKey}
              name={column?.name}
              isPrimaryKey={column?.isPrimaryKey}
              isConnectable={isConnectable}
            />
          ))
        : null}

      <div
        className="flex cursor-cell justify-center border-2 border-dashed border-input-background px-2 py-1 text-sm text-gray-400 duration-75 hover:border-accent-green hover:bg-accent-green/50 hover:text-white"
        onClick={() => {
          insertColumn();
        }}
      >
        Add Column
      </div>
      <div className="h-2 w-full rounded-b-lg bg-primary" />
    </div>
  );
};

export default memo(Table);
