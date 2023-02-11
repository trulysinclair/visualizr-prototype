import Hover from "@/components/nodes/table/hover";
import { IColumn, TableNode } from "@/types/table";
import useVisualizrStore from "@/util/store/use-visualizr-store";
import {
  ExclamationCircleIcon,
  FingerPrintIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import {
  IconCircleSquare,
  IconDelta,
  IconExclamationCircle,
  IconExclamationMark,
  IconKey,
} from "@tabler/icons-react";
import clsx from "clsx";
import { memo } from "react";
import { Handle, Position } from "reactflow";

const sharedClasses = clsx(
  "h-2 w-2 duration-200 border-none bg-accent-orange opacity-0",
  "hover:bg-black hover:ring-2 hover:ring-accent-orange group-hover/column:opacity-100"
);

interface TableColumnProps extends IColumn {
  isConnectable: boolean;
  parentNodeId: string;
  index: number;
  setColumns: any;
}

// TODO: add a way to reorder columns
// TODO: add a way to add foreign keys
// TODO: add a way to add default values
// TODO: add a way to add descriptions
// TODO: add a way to add unique constraints
// TODO: add a way to add primary key constraints
// TODO: add a way to add check constraints
// TODO: add a way to add exclusion constraints
// TODO: add a way to add indexes
// TODO: add a way to add triggers
// TODO: enforce unique constraints as well as primary key constraints, i.e. if a column is a primary key, it should also be unique. This should be enforced in the database as well as in the UI. Additionally, if a column is unique, it should not be nullable. Foreign keys should include constraints that enforce referential integrity. Foreign keys should not be allowed to be repeated in the SQL. When a new primary key is set, we need to update the relationships if they exist, we need to push that key to the top of the table, if a relationship exists and the foreign key type changes it needs to update the remote table or at least warn.
const TableColumn = (props: TableColumnProps) => {
  const { getNode } = useVisualizrStore();

  const column = getNode<TableNode>(props.parentNodeId).data.columns[
    props.index
  ];

  const nodeId = props.parentNodeId;

  return column ? (
    <div className="group/column relative border-b border-primary px-2 py-1 font-mono text-sm text-gray-400 duration-100 last:border-b-0 last:border-none hover:bg-input-background/50 hover:text-gray-200">
      <Handle
        id={`${props.parentNodeId}-${props.index}-target`}
        type="target"
        position={Position.Left}
        className={clsx("-left-[5px]", sharedClasses)}
        isConnectable={props.isConnectable}
      />

      <div className="grid grid-cols-3">
        <div className="w-24 truncate">
          {column.name ? column.name : props.name}
        </div>

        <div className="flex items-center justify-center">
          <IconKey
            height={16}
            className={clsx(
              "opacity-70 group-hover/column:opacity-100",
              column.isPrimaryKey ? "text-amber-400" : "text-input-background"
            )}
          />

          <IconExclamationCircle
            height={16}
            className={clsx(
              "opacity-70 group-hover/column:opacity-100",
              column.isNullable ? "text-accent-red" : "text-input-background"
            )}
          />

          <IconDelta
            height={16}
            className={clsx(
              "opacity-70 group-hover/column:opacity-100",
              column.isUnique ? "text-accent-green" : "text-input-background"
            )}
          />
        </div>

        <div className="flex w-24 items-center justify-center">
          <span>
            {column ? column.type?.toLowerCase() : props.type.toLowerCase()}
          </span>
        </div>
      </div>

      <Handle
        id={`${props.parentNodeId}-${props.index}-source`}
        type="source"
        position={Position.Right}
        className={clsx("-right-[5px]", sharedClasses)}
        isConnectable={props.isConnectable}
      />
    </div>
  ) : null;
};

export default memo(TableColumn);
