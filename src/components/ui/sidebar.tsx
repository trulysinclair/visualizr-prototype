import { ITable, TableNode } from "@/types/table";
import useVisualizrStore from "@/util/store/use-visualizr-store";
import { log } from "console";
import { useEffect, useState } from "react";
import { Edge, Panel, useOnSelectionChange } from "reactflow";
import { shallow } from "zustand/shallow";

export const Sidebar = () => {
  const [selectedNode, setSelectedNode] = useState<TableNode | null>(null);
  const [selectedEdges, setSelectedEdges] = useState<Edge[]>([]);
  const [selectedNodeData, setSelectedNodeData] = useState<ITable>(
    {} as ITable
  );
  const { nodes } = useVisualizrStore((state) => ({
    nodes: state.nodes,
  }));
  const { updateNode, getNode, addNotification,test } = useVisualizrStore();

  // When the user selects a node, update the sidebar
  useOnSelectionChange({
    onChange: ({ nodes, edges }: { nodes: TableNode[]; edges: Edge[] }) => {
      if (nodes == null) return;
      else if (nodes.length > 0) {
        setSelectedNode(nodes[0]);
        setSelectedNodeData(nodes[0].data);
        // setSelectedEdges(edges);
      }
    },
  } as any);

  test()

  // When the user updates the node data, update the node in the store
  useEffect(() => {
    if (selectedNode == null) return;
    // console.log(selectedNodeData);
    updateNode(selectedNode.id, selectedNodeData);
  }, [selectedNodeData, updateNode, selectedNode]);

  // when the nodes are updated, update the selected node
  // useEffect(() => {
  //   if (selectedNode == null) return;
  //   else if (selectedNode.selected) {
  //     // addNotification({
  //     //   title: "Node updated",
  //     //   message: `Node ${selectedNode.id} was updated`,
  //     //   type: "info",
  //     // })
  //     if (selectedNodeData != getNode<TableNode>(selectedNode.id).data) {
  //       console.log(selectedNodeData);
  //       console.log(getNode<TableNode>(selectedNode.id).data);
  //       console.log("nodes updated");
  //       setSelectedNodeData(getNode<TableNode>(selectedNode.id).data);
  //     }
  //   }
  // }, [selectedNode, nodes, getNode, selectedNodeData, addNotification]);

  return (
    <Panel
      position="top-right"
      className="0 top-1/2 flex -translate-y-1/2 items-center"
    >
      <div className="space-y-2 rounded-2xl bg-primary p-4 text-white shadow-md">
        {selectedNode ? (
          <form className="flex flex-col space-y-2">
            <div>
              <label htmlFor="name">Name</label>
              <input
                className="ml-2 rounded text-black"
                type="text"
                name="name"
                id="name"
                value={selectedNodeData.title}
                onChange={(event) => {
                  setSelectedNodeData((prev) => ({
                    ...prev,
                    title: event.target.value,
                  }));
                }}
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input
                className="ml-2 rounded text-black"
                type="text"
                name="description"
                id="description"
                value={selectedNodeData.description}
                onChange={(event) => {
                  setSelectedNodeData((prev) => ({
                    ...prev,
                    description: event.target.value,
                  }));
                }}
              />
            </div>
            <div>
              <label htmlFor="columns">Columns</label>
              <div className="ml-2 space-y-2 rounded text-black">
                {selectedNodeData.columns.map((column, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      name="column"
                      id="column"
                      value={column.name}
                      onChange={(event) => {
                        setSelectedNodeData((prev) => ({
                          ...prev,
                          columns: prev.columns.map((col, i) =>
                            i === index
                              ? { ...col, name: event.target.value }
                              : col
                          ),
                        }));
                      }}
                    />
                    <input
                      type="text"
                      name="column"
                      id="column"
                      value={column.type}
                      onChange={(event) => {
                        setSelectedNodeData((prev) => ({
                          ...prev,
                          columns: prev.columns.map((col, i) =>
                            i === index
                              ? { ...col, type: event.target.value as any }
                              : col
                          ),
                        }));
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </form>
        ) : (
          <div className="text-center">No node selected</div>
        )}
      </div>
    </Panel>
  );
};
