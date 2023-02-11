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

  // const insertColumn = () => {

  //   setColumns([
  //     // remove null and undefined values from the array, not sure why they are there, but they are. This is a hacky fix.
  //     ...columns.filter((item) => item != null && item != undefined),
  //     newColumn,
  //   ]);
  // };

  // update columns in the store
  useEffect(() => {
    if (getNode<TableNode>(nodeId).data.columns == columns)
      updateNode(nodeId, { columns });
  }, [columns, nodeId, updateNode, getNode]);

  return (
    <div
      className={clsx(
        "group/table cursor-auto rounded-lg border border-gray-800 shadow-md duration-200 hover:border-accent-orange focus-visible:outline-none",
        selected ? "border-accent-orange bg-primary" : "bg-secondary"
      )}
    >
      <div
        id="drag-handle"
        className={clsx(
          "flex shrink cursor-grab items-center justify-center rounded-t-lg  p-2 text-center text-sm font-normal text-white duration-200",
          selected ? "bg-input-background" : "bg-primary"
        )}
      >
        {/* <input
          type="text"
          value={data.title}
          onChange={(event) =>
            updateNode(nodeId, { title: event.target.value })
          }
          className="flex shrink truncate rounded bg-secondary/70 text-center text-sm font-normal text-white focus:outline-none"
        /> */}
        <p>
          <span className="truncate text-sm font-medium text-white">
            {data.title}
          </span>
        </p>
      </div>

      <div>
        {data.columns.length > 0 && data.columns
          ? data.columns.map((column, index) => (
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
      </div>

      <div
        className={clsx(
          "h-2 w-full rounded-b-lg duration-200",
          selected ? "bg-input-background" : "bg-primary"
        )}
      />
    </div>
  );
};

export default memo(Table);
