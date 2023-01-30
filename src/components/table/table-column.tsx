import Hover from "@/components/table/popover";
import { IColumn } from "@/types/table";
import {
  ExclamationCircleIcon,
  FingerPrintIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Handle, Position } from "reactflow";
import { v4 } from "uuid";

const sharedClasses = clsx(
  "h-2 w-2 duration-200 border-none bg-accent-orange opacity-0",
  "hover:bg-black hover:ring-2 hover:ring-accent-orange group-hover:opacity-100"
);

interface TableColumnProps extends IColumn {
  isConnectable: boolean;
}

const TableColumn = (props: TableColumnProps) => (
  <div className="relative border-b border-primary px-2 py-1 font-mono text-sm text-gray-400 hover:text-gray-200 duration-100 hover:bg-primary/50">
    <Handle
      id={v4()}
      type="target"
      position={Position.Left}
      className={clsx("-left-[5px]", sharedClasses)}
      onConnect={(params) => console.log("handle onConnect", params)}
      isConnectable={props.isConnectable}
    />

    <div className="grid grid-cols-3">
      <div className="">{props.name}</div>

      <div className="flex justify-center">
        <Hover
          title="PRIMARY KEY"
          icon={
            <KeyIcon
              className={clsx(
                props.isPrimaryKey ? "text-amber-400" : "text-input-background"
              )}
            />
          }
        />
        <Hover
          title="NOT NULL"
          icon={
            <ExclamationCircleIcon
              className={clsx(
                props.isNullable == false
                  ? "text-accent-red"
                  : "text-input-background"
              )}
            />
          }
        />
        <Hover
          title="UNIQUE"
          icon={
            <FingerPrintIcon
              className={clsx(
                props.isUnique ? "text-accent-green" : "text-input-background"
              )}
            />
          }
        />
      </div>

      <div className="flex items-center justify-center px-1">
        <span>{props.type.toLocaleLowerCase()}</span>
      </div>
    </div>

    <Handle
      id={v4()}
      type="source"
      position={Position.Right}
      className={clsx("-right-[5px]", sharedClasses)}
      onConnect={(params) => console.log("handle onConnect", params)}
      isConnectable={props.isConnectable}
    />
  </div>
);

export default TableColumn;
