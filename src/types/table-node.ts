import { Node } from "reactflow";

/**
 * The data which is stored in a table node.
 */
export interface ITableData {
  title: string;
  description: string;
  columns: { name: string; type: string }[];
}

/**
 * A custom node which represents a table in a database.
 *
 * A table node has a title, a description, and a list of columns.
 * @see https://reactflow.dev/docs/api/node/
 */
export type TableNode = Node<ITableData>;
