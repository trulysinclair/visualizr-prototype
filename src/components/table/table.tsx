import { ITable } from "@/types/table";
import { memo } from "react";
import { Node, NodeProps } from "reactflow";
import { v4 } from "uuid";
import TableColumn from "./table-column";

/**
 * A custom node which represents a table in a database.
 *
 * A table node has a title, a description, and a list of columns.
 * @see https://reactflow.dev/docs/api/node/
 */
const Table = ({ data, isConnectable }: NodeProps<ITable>) => {
  return (
    <div className="group rounded-lg border border-gray-800 bg-secondary shadow duration-200 hover:border-accent-orange focus-visible:outline-none">
      <div className="rounded-t-lg bg-primary p-2 text-center text-sm  font-normal text-white">
        {data.title}
      </div>

      {data.columns.map((column) => (
        <TableColumn
          key={v4()}
          type={column.type}
          defaultValue={column.defaultValue}
          description={column.description}
          length={column.length}
          isNullable={column.isNullable}
          isAutoIncrement={column.isAutoIncrement}
          isUnique={column.isUnique}
          foreignKey={column.foreignKey}
          name={column.name}
          isPrimaryKey={column.isPrimaryKey}
          isConnectable={isConnectable}
        />
      ))}
      <div className="h-2 w-full rounded-b-lg bg-primary" />
    </div>
  );
};

export default memo(Table);
