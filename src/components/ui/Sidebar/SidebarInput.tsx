import { IColumn, ITable } from "@/types/table";
import useVisualizrStore from "@/util/store/use-visualizr-store";
import { snakeCasePattern, spaceToUnderscore } from "@/util/string-validation";
import { Fragment } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  property: keyof ITable | keyof IColumn;
  onChange?: () => void;
  value?: string;
  column?: IColumn;
}

const sharedInputClasses =
  "form-input w-full truncate rounded border-none bg-transparent font-mono text-base font-medium text-gray-400 outline-none invalid:text-accent-red focus:border-none focus:outline-none focus:ring-transparent focus-visible:text-gray-200 focus-visible:outline-none";

export const SidebarInput = ({
  name,
  property,
  onChange,
  column,
  ...rest
}: Props) => {
  const { updateTable, table, updateColumn } = useVisualizrStore();

  return table ? (
    <div className="group/input relative rounded-xl border-2 border-input-background transition-colors duration-150 focus-within:border-accent-orange">
      {column ? (
        <Fragment>
          <label
            htmlFor={column.name}
            className="absolute left-2 -translate-y-1/2 bg-primary px-1 text-sm text-white"
          >
            Name
          </label>
          <input
            id={column.name}
            type="text"
            name={column.name}
            value={column.name}
            spellCheck="false"
            pattern={snakeCasePattern}
            className={sharedInputClasses}
            onChange={(event) => {
              updateColumn({
                ...column,
                name: spaceToUnderscore(event.target.value),
              });
            }}
            {...rest}
          />
        </Fragment>
      ) : (
        <Fragment>
          {name && (
            <label
              htmlFor={name}
              className="absolute left-2 -translate-y-1/2 bg-primary px-1 text-sm"
            >
              {name}
            </label>
          )}
          <input
            id={name}
            type="text"
            name={name}
            value={table.data[property as keyof ITable] + ""}
            className={sharedInputClasses}
            onChange={(event) => {
              updateTable({ ...table.data!, [property]: event.target.value });
            }}
            {...rest}
          />
        </Fragment>
      )}
    </div>
  ) : null;
};
