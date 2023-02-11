import { ITable } from "@/types/table";
import useVisualizrStore from "@/util/store/use-visualizr-store";

type Props = {
  name: string;
  property: keyof ITable;
  textarea?: boolean;
};

export const SidebarInput = ({ name, property, textarea }: Props) => {
  const { updateTable, table } = useVisualizrStore();

  return table ? (
    <div className="group/input relative w-full rounded-xl border-2 border-input-background transition-colors duration-150 focus-within:border-accent-orange">
      <label
        htmlFor={name}
        className="absolute left-2 -translate-y-1/2 bg-primary px-1 text-sm "
      >
        {name}
      </label>
      {!textarea ? (
        <input
          className="m-2 w-full truncate rounded bg-transparent text-gray-400 focus-visible:text-gray-200 focus-visible:outline-none"
          type="text"
          name={name}
          id={name}
          value={table.data[property] + ""}
          onChange={(event) => {
            updateTable({ ...table.data!, [property]: event.target.value });
          }}
        />
      ) : (
        <textarea
          className="m-2 mb-0 block w-[98%] truncate rounded bg-transparent text-gray-400 focus-visible:text-gray-200 focus-visible:outline-none"
          name={name}
          id={name}
          value={table.data[property] + ""}
          onChange={(event) => {
            updateTable({ ...table.data!, [property]: event.target.value });
          }}
        />
      )}
    </div>
  ) : null;
};
