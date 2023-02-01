import { ITable, TableNode } from "@/types/table";
import { useCallback, useEffect, useState } from "react";
import {
  Edge,
  Panel,
  useOnSelectionChange,
  useUpdateNodeInternals,
} from "reactflow";

export const Sidebar = () => {
  const [selectedNodes, setSelectedNodes] = useState<TableNode[]>([]);
  const [selectedEdges, setSelectedEdges] = useState<Edge[]>([]);
  const [selectedNodeData, setSelectedNodeData] = useState<ITable>({} as ITable);

  const updateNodeInternals = useUpdateNodeInternals();

  const onChange = useCallback(
    (evt: { target: { value: any } }) => {
      console.log(evt.target.value);
      selectedNodes[0].data.title = evt.target.value;
      setSelectedNodeData(selectedNodes[0].data);
      // updateNodeInternals(selectedNodes[0].id);
    },
    [selectedNodes]
  );

  useEffect(() => {
    if (selectedNodes.length === 0) return;

    setSelectedNodeData(selectedNodes[0].data);

    updateNodeInternals(selectedNodes[0].id);
    
    console.log(selectedNodes);
  }, [selectedNodes, updateNodeInternals, selectedNodeData]);

  useOnSelectionChange({
    onChange: ({ nodes, edges }: { nodes: TableNode[]; edges: Edge[] }) => {
      setSelectedNodes(nodes);
      setSelectedEdges(edges);
    },
  } as any);

  useEffect(() => {
    if (selectedNodes.length === 0) return;
    console.log(selectedNodes[0].data.title);
  }, [selectedNodes, selectedEdges]);

  return (
    <Panel position="top-right" className="0 top-1/2 flex items-center">
      <div className="space-y-2 rounded-2xl bg-primary p-4 text-white shadow-md">
        {selectedNodes.length > 0 ? (
          <form>
            <label htmlFor="name">Name</label>
            <input
              className="ml-2 rounded text-black"
              type="text"
              name="name"
              id="name"
              defaultValue={selectedNodes[0].data.title}
              onChange={onChange}
            />
          </form>
        ) : (
          <div className="text-center">No node selected</div>
        )}
      </div>
    </Panel>
  );
};
