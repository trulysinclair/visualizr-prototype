import { Handle, Position } from "reactflow";
import { v4 } from "uuid";

type TableColumnProps = {
  columnName: string;
  isConnectable: boolean;
};

const TableColumn = ({
  columnName,
  isConnectable,
}: TableColumnProps) => (
  <div className="relative px-2 text-slate-600">
    <Handle
      id={v4()}
      type="target"
      position={Position.Left}
      className="z-10 !h-2 !left-0 !min-w-[2px] !w-[2px] !bg-indigo-600 !rounded-none !border-none"
      onConnect={(params) => console.log("handle onConnect", params)}
      isConnectable={isConnectable}
    />
    {columnName}
    <Handle
      id={v4()}
      type="source"
      position={Position.Right}
      className="z-10 !h-2 !right-0 !min-w-[2px] !w-[2px] !bg-indigo-600 !rounded-none !border-none"
      onConnect={(params) => console.log("handle onConnect", params)}
      isConnectable={isConnectable}
    />
  </div>
);

export default TableColumn;
