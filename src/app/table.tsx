import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

const Table = ({ data, isConnectable }: NodeProps) => {
  return (
    <div className="w-50 rounded-t border bg-white focus-visible:outline-none">
      <div className="rounded-t bg-blue-500 px-2 text-sm font-medium text-white">
        {data.label}
      </div>
      <div className="relative px-2 text-slate-600">
        <Handle
          id="a"
          type="target"
          position={Position.Left}
          className="z-10 rounded-full !bg-indigo-600"
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
        />
        {data.description} is very cool
      </div>
      <div className="relative px-2 text-slate-600">
        <Handle
          id="b"
          type="target"
          position={Position.Left}
          className="z-10 rounded-full !bg-indigo-600"
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
        />
        {data.description} is very cool
        <Handle
          id="bb"
          type="source"
          position={Position.Right}
          className="z-10 rounded-full !bg-indigo-600"
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
        />
      </div>
      <div className="relative px-2 text-slate-600">
        <Handle
          id="c"
          type="target"
          position={Position.Left}
          className="z-10 rounded-full !bg-indigo-600"
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
        />
        {data.description} is very cool
      </div>
    </div>
  );
};

export default memo(Table);
