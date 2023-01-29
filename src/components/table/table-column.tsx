import { IColumn } from "@/types/table-node";
import { ExclamationCircleIcon, FingerPrintIcon, KeyIcon } from "@heroicons/react/24/solid";
import { Handle, Position } from "reactflow";
import { v4 } from "uuid";

interface TableColumnProps extends IColumn {
  isConnectable: boolean;
};

const TableColumn = (props: TableColumnProps) => (
  <div className="relative border-b px-2 text-slate-600">
    <Handle
      id={v4()}
      type="target"
      position={Position.Left}
      className="!left-0 z-10 !h-2 !w-[2px] !min-w-[2px] !rounded-none !border-none !bg-indigo-600"
      onConnect={(params) => console.log("handle onConnect", params)}
      isConnectable={props.isConnectable}
    />

    <div className="flex flex-row w-full">
      <p className="flex-1">{props.name}</p>
      
      <span className="flex">
        {props.isPrimaryKey && <KeyIcon width={16} className="text-amber-400 fill-amber-400" />}
        {props.isNullable && <ExclamationCircleIcon width={16} />}
        {props.isUnique && <FingerPrintIcon width={16} />}
      </span>
    </div>
    
    <Handle
      id={v4()}
      type="source"
      position={Position.Right}
      className="!right-0 z-10 !h-2 !w-[2px] !min-w-[2px] !rounded-none !border-none !bg-indigo-600"
      onConnect={(params) => console.log("handle onConnect", params)}
      isConnectable={props.isConnectable}
    />
  </div>
);

export default TableColumn;
