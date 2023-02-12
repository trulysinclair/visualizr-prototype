import { Slice } from "@/types/store";
import { IColumn, ITable } from "@/types/table";
import produce from "immer";

type ForeignKey = {
  id: string;
  table: string;
  column: string;
};

type TableReference = {
  id: string;
  data: ITable;
};

export type TableSlice = {
  /** The table being edited */
  table: TableReference | null;
  /** Set the table being edited */
  setTableToEdit: (table: TableReference | null) => void;
  /** Update the table being edited, not the columns. */
  updateTable: (table: ITable) => void;
  addColumn: (column: IColumn) => void;
  updateColumn: (column: IColumn) => void;
  removeColumn: (column: IColumn) => void;
  // addForeignKey: (table: Table, foreignKey: ForeignKey) => void;
  // removeForeignKey: (table: Table, foreignKey: ForeignKey) => void;
  // updateForeignKey: (table: Table, foreignKey: ForeignKey) => void;
};

export const createTableSlice: Slice<TableSlice> = (set, get) => ({
  table: null,
  setTableToEdit: (table) => {
    if (table === null) {
      set({ table: null });
    } else {
      set({
        table,
      });
    }
  },
  updateTable: (table) => {
    set({
      table: produce(get().table, (draft) => {
        if (draft === null) return;

        draft.data.title = table.title;
        draft.data.description = table.description;
      }),
    });
  },
  addColumn: (column) => {
    if (get().table !== null) {
      set({
        table: produce(get().table, (draft) => {
          if (draft === null) return;

          draft.data.columns.push(column);
        }),
      });
    }
  },
  updateColumn: (column) => {
    
    set({
      table: produce(get().table, (draft) => {
        if (draft === null) return;

        const index = draft.data.columns.findIndex((c) => c.id === column.id);

        if (index !== -1) {
          draft.data.columns[index] = column;
        }

        console.log(get().table?.data.columns[index]);
      }),
    });
  },
  removeColumn: (column) => {
    // set((state) => ({
    //   tables: state.tables.map((t) =>
    //     t.title === table.title
    //       ? { ...t, columns: t.columns.filter((c) => c.id !== column.id) }
    //       : t
    //   ),
    // }));
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
