import { PSQLDataTypes } from "@/types/postgresql";
import { Node } from "reactflow";

export interface IColumn {
  id: string;
  name: string;
  isPrimaryKey: boolean;
  isNullable: boolean;
  isUnique: boolean;
  type: PSQLDataTypes;
  length?: number;
  defaultValue?: string;
  description: string;
  isAutoIncrement: boolean;
  isArray?: boolean;
  foreignKey: {
    table: string;
    column: string;
  } | null;
}

/**
 * The data which is stored in a table node.
 */
export interface ITable {
  title: string;
  description: string;
  columns: IColumn[];
}

/**
 * A custom node which represents a table in a database.
 *
 * A table node has a title, a description, and a list of columns.
 * @see https://reactflow.dev/docs/api/node/
 */
export type TableNode = Node<ITable, "table">;
