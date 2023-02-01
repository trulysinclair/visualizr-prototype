import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from "reactflow";
import { create } from "zustand";

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNode: (nodes: Node) => void;
  setEdge: (edges: Edge) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<RFState>((set, get) => ({
  nodes: [],
  edges: [],
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: "custom",
          animated: true,
          markerEnd: "end-one",
          markerStart: "start-one",
        },
        get().edges
      ),
    });
  },
  setNode: (node: Node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  setEdge: (edges: Edge) => {
    set({
      edges: [...get().edges, edges],
    });
  },
}));

export default useStore;
