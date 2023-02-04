import { TableNode } from "@/types/table";
import { dump } from "js-yaml";
import { ReactFlowJsonObject } from "reactflow";

function refineToYaml<NodeData, EdgeData>(
  data: ReactFlowJsonObject<NodeData, EdgeData>
): string {
  console.log(JSON.stringify(data, null, 2));

  const getNode = (nodeId: string) =>
    data.nodes.find((node) => node.id === nodeId) as TableNode;

  let sql = "";
  // @ts-ignore:disable-next-line
  data.nodes.forEach((node: TableNode) => {
    sql += `CREATE TABLE ${node.data.title} (\n`;

    node.data.columns.forEach((column) => {
      let field = [
        "  ",
        column.name,
        column.type,
        column.isNullable ? "NULL" : "NOT NULL",
        column.isPrimaryKey ? "PRIMARY KEY" : null,
        column.isUnique ? "UNIQUE" : null,
      ]
        .filter((item) => item != null)
        .join(" ");

      field += `,\n`;

      sql += field;
    });

    sql += `);\n\n`;
  });

  data.edges.forEach((edge) => {
    sql += `ALTER TABLE "${
      getNode(edge.source)?.data.title
    }" ADD FOREIGN KEY (${
      getNode(edge.source).data.columns.find(
        (column) => column.id === edge.sourceHandle?.replace("-source", "")
      )?.name
    }) REFERENCES ${getNode(edge.target).data.title} (${
      getNode(edge.target).data.columns.find(
        (column) => column.id === edge.targetHandle?.replace("-target", "")
      )?.name
    });\n`;
  });

  console.log(sql);

  return dump(data);
}

export default refineToYaml;
