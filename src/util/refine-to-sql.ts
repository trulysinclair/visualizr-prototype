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
        "\t",
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

  // TODO: Add foreign key constraints after all tables are created (or use a trigger) to avoid errors when creating tables in the wrong order. Also make sure to add the foreign key constraints in the correct order (i.e. the table that is referenced must be created before the table that references it). Also make sure that the referenced column is not a primary key? (or is it possible to reference a primary key?) Make sure we use the "fk_<table_name>" naming convention for foreign key constraints. And make sure constraints do not repeat (i.e. if a table is referenced by multiple tables, only create one foreign key constraint for it).

  data.edges.forEach((edge) => {
    let sourceNode = getNode(edge.source);
    let targetNode = getNode(edge.target);

    let constraintNameSourceTarget = `fk_${sourceNode?.data.title}_${targetNode?.data.title}`;
    let constraintNameTarget = `fk_${targetNode?.data.title}`;

    let foreignKeyRelation = [
      `ALTER TABLE`,
      `"${sourceNode?.data.title}"`,
      `ADD CONSTRAINT`,
      `"${constraintNameTarget}"`,
      `FOREIGN KEY`,
      `(${
        sourceNode.data.columns.find(
          (column) => column.id === edge.sourceHandle?.replace("-source", "")
        )?.name
      })`,
      `REFERENCES`,
      `${targetNode.data.title}`,
      `(${
        targetNode.data.columns.find(
          (column) => column.id === edge.targetHandle?.replace("-target", "")
        )?.name
      });\n`,
    ].join(" ");

    sql += foreignKeyRelation;
  });

  console.log(sql);

  return dump(data);
}

export default refineToYaml;
