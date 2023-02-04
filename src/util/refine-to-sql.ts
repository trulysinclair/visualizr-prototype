import { TableNode } from "@/types/table";
import { dump } from "js-yaml";
import { ReactFlowJsonObject } from "reactflow";

function refineToYaml<NodeData, EdgeData>(
  data: ReactFlowJsonObject<NodeData, EdgeData>
): string {
  console.log(JSON.stringify(data, null, 2));

  let sql = "";
  // @ts-ignore:disable-next-line
  data.nodes.forEach((node: TableNode) => {
    sql += `CREATE TABLE ${node.data.title} (\n`;

    node.data.columns.forEach((column) => {
      sql += `  ${column.name} ${column.type} ${
        column.isNullable ? "NULL" : "NOT NULL"
      } ${column.isPrimaryKey ? "PRIMARY KEY" : ""} ${
        column.isUnique ? "UNIQUE" : ""
      }},\n`;
    });

    sql += `);\n\n`;
  });

  console.log(sql);

  return dump(data);
}

export default refineToYaml;
