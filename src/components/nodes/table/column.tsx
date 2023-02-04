import Hover from "@/components/nodes/table/hover";
import { IColumn, TableNode } from "@/types/table";
import useAppStore from "@/util/app-store";
import {
  ExclamationCircleIcon,
  FingerPrintIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { memo } from "react";
import { Handle, Position } from "reactflow";
import { shallow } from "zustand/shallow";

const sharedClasses = clsx(
  "h-2 w-2 duration-200 border-none bg-accent-orange opacity-0",
  "hover:bg-black hover:ring-2 hover:ring-accent-orange group-hover:opacity-100"
);

interface TableColumnProps extends IColumn {
  isConnectable: boolean;
  parentNodeId: string;
  index: number;
  setColumns: any;
}

const TableColumn = (props: TableColumnProps) => {
  const { updateNode, getNode } = useAppStore(
    (state) => ({
      updateNode: state.updateNode,
      getNode: state.getNode<TableNode>,
    }),
    shallow
  );

  const column = getNode(props.parentNodeId).data.columns[props.index];

  const nodeId = props.parentNodeId;

  const toggleIsPrimaryKey = () => {
    updateNode(nodeId, {
      columns: getNode(nodeId).data.columns.map((column, index) => {
        if (index === props.index) {
          return { ...column, isPrimaryKey: !column.isPrimaryKey };
        }

        return column;
      }),
    });
  };

  const toggleIsNullable = () => {
    updateNode(nodeId, {
      columns: getNode(nodeId).data.columns.map((column, index) => {
        if (index === props.index) {
          return { ...column, isNullable: !column.isNullable };
        }

        return column;
      }),
    });
  };

  const toggleIsUnique = () => {
    updateNode(nodeId, {
      columns: getNode(nodeId).data.columns.map((column, index) => {
        if (index === props.index) {
          return { ...column, isUnique: !column.isUnique };
        }

        return column;
      }),
    });
  };

  return (
    <div className="relative border-b border-primary px-2 py-1 font-mono text-sm text-gray-400 duration-100 hover:bg-primary/50 hover:text-gray-200">
      <Handle
        id={`${props.parentNodeId}-${props.index}-target`}
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
                  (column ? column.isPrimaryKey : props.isPrimaryKey)
                    ? "text-amber-400"
                    : "text-input-background"
                )}
              />
            }
            onClick={toggleIsPrimaryKey}
          />
          <Hover
            title="NOT NULL"
            icon={
              <ExclamationCircleIcon
                className={clsx(
                  (column ? column.isNullable : props.isNullable) == false
                    ? "text-accent-red"
                    : "text-input-background"
                )}
              />
            }
            onClick={toggleIsNullable}
          />
          <Hover
            title="UNIQUE"
            icon={
              <FingerPrintIcon
                className={clsx(
                  (column ? column.isUnique : props.isUnique)
                    ? "text-accent-green"
                    : "text-input-background"
                )}
              />
            }
            onClick={toggleIsUnique}
          />
        </div>

        <div className="flex items-center justify-center px-1">
          <span>{props.type?.toLocaleLowerCase()}</span>
        </div>
      </div>

      <Handle
        id={`${props.parentNodeId}-${props.index}-source`}
        type="source"
        position={Position.Right}
        className={clsx("-right-[5px]", sharedClasses)}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={props.isConnectable}
      />
    </div>
  );
};

export default memo(TableColumn);
