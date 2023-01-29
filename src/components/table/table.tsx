import { ITable } from "@/types/table-node";
import { memo } from "react";
import { NodeProps } from "reactflow";
import TableColumn from "./table-column";

/**
 * A custom node which represents a table in a database.
 *
 * A table node has a title, a description, and a list of columns.
 * @see https://reactflow.dev/docs/api/node/
 */
const Table = ({ data, isConnectable }: NodeProps<ITable>) => {
  return (
    <div className="w-40 h-40 rounded shadow bg-white focus-visible:outline-none pb-2">
      <div className="rounded-t bg-blue-500 px-2 text-sm font-medium text-white">
        {data.title}
      </div>

      {data.columns.map((column) => (
        <TableColumn
          key={column.name}
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

    </div>
  );
};

export default memo(Table);
