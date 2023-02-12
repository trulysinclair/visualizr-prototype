import { ITable } from "@/types/table";
import clsx from "clsx";
import { memo } from "react";
import { NodeProps, useNodeId } from "reactflow";
import { v4 } from "uuid";
import TableColumn from "./Column";

/**
 * A custom node which represents a table in a database.
 *
 * A table node has a title, a description, and a list of columns.
 * @see https://reactflow.dev/docs/api/node/
 */
const Table = ({ data, isConnectable, selected }: NodeProps<ITable>) => {
  const nodeId = useNodeId()!;

  return (
    <div
      className={clsx(
        "group/table cursor-auto rounded-lg border border-gray-800 shadow-md duration-200 focus-visible:outline-none hover:border-accent-orange",
        selected ? "border-accent-orange bg-primary" : "bg-secondary"
      )}
    >
      <div
        id="drag-handle"
        className={clsx(
          "flex shrink cursor-grab flex-col items-center justify-center rounded-t-lg  p-2 text-center text-sm font-normal text-white duration-200",
          selected ? "bg-input-background" : "bg-primary"
        )}
      >
        <span className="truncate text-sm font-medium text-white">
          {data.title}
        </span>
        <p className="text-sm font-thin text-gray-300">{data.description}</p>
      </div>

      <div>
        {data.columns.length > 0 && data.columns
          ? data.columns.map((column, index) => (
              <TableColumn
                id={column?.id}
                key={v4()}
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
