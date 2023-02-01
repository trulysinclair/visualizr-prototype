import { FunctionNode } from "@/types/function";
import { PSQLDataTypes, PSQLNumericType } from "@/types/postgresql";
import { TriggerNode } from "@/types/trigger";
import { XYPosition } from "reactflow";
import { v4 } from "uuid";
import { TableNode } from "../types/table";

export function createNode(
  type: "table" | "function" | "trigger",
  position: XYPosition
): TableNode | FunctionNode | TriggerNode {
  switch (type) {
    case "table":
      return {
        id: v4(),
        type,
        dragHandle:"#drag-handle",
        position,
        data: {
          title: `New Table`,
          description: "description",
          columns: [
            {
              name: "id",
              type: PSQLDataTypes.SERIAL,
              isPrimaryKey: true,
              isNullable: false,
              isUnique: true,
              isAutoIncrement: true,
              foreignKey: null,
              description: "The ID of the table",
            },
            {
              name: "created_at",
              type: PSQLDataTypes.TIMESTAMPTZ,
              isPrimaryKey: false,
              isNullable: false,
              isUnique: false,
              isAutoIncrement: false,
              foreignKey: null,
              description: "The time the row was created",
            },
            {
              name: "updated_at",
              type: PSQLDataTypes.TIMESTAMPTZ,
              isPrimaryKey: false,
              isNullable: false,
              isUnique: false,
              isAutoIncrement: false,
              foreignKey: null,
              description: "The time the row was last updated",
            },
          ],
        },
      };

    case "function":
      return {
        id: v4(),
        type,
        position,
        data: {
          title: `New Function`,
          description: "description",
          parameters: [],
          returnType: "",
        },
      };
      
    case "trigger":
      return {
        id: v4(),
        type,
        position,
        data: {
          title: `New Trigger`,
          description: "description",
          parameters: [],
          returnType: "",
        },
      };
  }
}
