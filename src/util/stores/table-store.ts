import { IColumn, ITable } from "@/types/table";
import createSelectors from "@/util/create-selectors";
import { create } from "zustand";

type ForeignKey = {
  id: string;
  table: string;
  column: string;
};

export type TableState<Table = ITable> = {
  tables: Table[];
  addTable: (table: Table) => void;
  removeTable: (table: Table) => void;
  updateTable: (table: Table) => void;
  addColumn: (table: Table, column: IColumn) => void;
  removeColumn: (table: Table, column: IColumn) => void;
  updateColumn: (table: Table, column: IColumn) => void;
  // addForeignKey: (table: Table, foreignKey: ForeignKey) => void;
  // removeForeignKey: (table: Table, foreignKey: ForeignKey) => void;
  // updateForeignKey: (table: Table, foreignKey: ForeignKey) => void;
};

export const useTableStore = create<TableState>((set) => ({
  tables: [],
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
}));

export default createSelectors(useTableStore);
