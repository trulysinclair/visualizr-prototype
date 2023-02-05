import { IColumn, ITable } from "@/types/table";
import { Slice } from "@/util/store/use-visualizr-store";

type ForeignKey = {
  id: string;
  table: string;
  column: string;
};

export type TableSlice = {
  tables: ITable[];
  addTable: (table: ITable) => void;
  removeTable: (table: ITable) => void;
  updateTable: (table: ITable) => void;
  addColumn: (table: ITable, column: IColumn) => void;
  removeColumn: (table: ITable, column: IColumn) => void;
  updateColumn: (table: ITable, column: IColumn) => void;
  // addForeignKey: (table: Table, foreignKey: ForeignKey) => void;
  // removeForeignKey: (table: Table, foreignKey: ForeignKey) => void;
  // updateForeignKey: (table: Table, foreignKey: ForeignKey) => void;
};

export const createTableSlice: Slice<TableSlice> = (
  set,
  get,
) => ({
  // tables: get().nodes.filter((n) => n.type === "table").filter((n) => n.data) as ITable[],
  tables: get(),
  addTable: (table) => {
    set((state) => ({
      tables: [...state.tables, table],
    }));
  },
  removeTable: (table) => {
    set((state) => ({
      tables: state.tables.filter((t) => t.title !== table.title),
    }));
  },
  updateTable: (table) => {
    set((state) => ({
      tables: state.tables.map((t) => (t.title === table.title ? table : t)),
    }));
  },
  addColumn: (table, column) => {
    set((state) => ({
      tables: state.tables.map((t) =>
        t.title === table.title ? { ...t, columns: [...t.columns, column] } : t
      ),
    }));
  },
  removeColumn: (table, column) => {
    set((state) => ({
      tables: state.tables.map((t) =>
        t.title === table.title
          ? { ...t, columns: t.columns.filter((c) => c.id !== column.id) }
          : t
      ),
    }));
  },
  updateColumn: (table, column) => {
    set((state) => ({
      tables: state.tables.map((t) =>
        t.title === table.title
          ? {
              ...t,
              columns: t.columns.map((c) => (c.id === column.id ? column : c)),
            }
          : t
      ),
    }));
  },
  // addForeignKey: (table, foreignKey) => {
  //   set((state) => ({
  //     tables: state.tables.map((t) =>
  //       t.title === table.title
  //         ? { ...t, foreignKeys: [...t.foreignKeys, foreignKey] }
  //         : t
  //     ),
  //   }));
  // },
  // removeForeignKey: (table, foreignKey) => {
  //   set((state) => ({
  //     tables: state.tables.map((t) =>
  //       t.title === table.title
  //         ? {
  //             ...t,
  //             foreignKeys: t.foreignKeys.filter(
  //               (fk) => fk.id !== foreignKey.id
  //             ),
  //           }
  //         : t
  //     ),
  //   }));
  // },
  // updateForeignKey: (table, foreignKey) => {
  //   set((state) => ({
  //     tables: state.tables.map((t) =>
  //       t.title === table.title
  //         ? {
  //             ...t,
  //             foreignKeys: t.foreignKeys.map((fk) =>
  //               fk.id === foreignKey.id ? foreignKey : fk
  //             ),
  //           }
  //         : t
  //     ),
  //   }));
  // },
});

export default createTableSlice;
