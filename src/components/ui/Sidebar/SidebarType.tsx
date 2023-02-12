import SidebarSelect from "@/components/ui/Sidebar/SidebarSelect";
import { PSQLDataTypes } from "@/types/postgresql";
import { IColumn } from "@/types/table";
import useVisualizrStore from "@/util/store/use-visualizr-store";

interface SidebarTypeProps {
  column: IColumn;
}
export const SidebarType = ({ column }: SidebarTypeProps) => {
  const { updateColumn } = useVisualizrStore();
  return (
    <div>
      <SidebarSelect
        name="Type"
        options={Object.values(PSQLDataTypes)}
        value={column.type}
        onChange={(value) => updateColumn({ ...column, type: value as PSQLDataTypes })} />
    </div>
  );
};
