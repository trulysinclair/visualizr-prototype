import Hover from "@/components/nodes/Table/Hover";
import { IColumn } from "@/types/table";
import useVisualizrStore from "@/util/store/use-visualizr-store";
import { IconDelta, IconExclamationCircle, IconKey } from "@tabler/icons-react";
import clsx from "clsx";
import { hoverIconWidth } from ".";

interface SidebarConstraintsProps {
  column: IColumn;
}
export const SidebarConstraints = ({ column }: SidebarConstraintsProps) => {
  const { updateColumn } = useVisualizrStore();

  return (
    <div className="flex shrink justify-center space-x-1">
      <Hover
        title="PRIMARY KEY"
        width={hoverIconWidth}
        icon={<IconKey
          height={24}
          className={clsx(
            "opacity-70 group-hover/column:opacity-100",
            column.isPrimaryKey ? "text-amber-400" : "text-input-background"
          )} />}
        onClick={() => updateColumn({
          ...column,
          isPrimaryKey: !column.isPrimaryKey,
        })} />
      <Hover
        title="NOT NULL"
        width={hoverIconWidth}
        icon={<IconExclamationCircle
          height={24}
          className={clsx(
            "opacity-70 group-hover/column:opacity-100",
            column.isNullable === false
              ? "text-accent-red"
              : "text-input-background"
          )} />}
        onClick={() => updateColumn({
          ...column,
          isNullable: !column.isNullable,
        })} />
      <Hover
        title="UNIQUE"
        width={hoverIconWidth}
        icon={<IconDelta
          height={24}
          className={clsx(
            "opacity-70 group-hover/column:opacity-100",
            column.isUnique ? "text-accent-green" : "text-input-background"
          )} />}
        onClick={() => updateColumn({
          ...column,
          isUnique: !column.isUnique,
        })} />
    </div>
  );
};
