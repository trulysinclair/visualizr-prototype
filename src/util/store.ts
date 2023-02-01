import { createNode } from "@/util/createNode";
import { MutableRefObject, DragEvent } from "react";
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
  OnInit,
  OnNodesChange,
  ReactFlowInstance,
} from "reactflow";
import { create } from "zustand";

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  reactFlowInstance: ReactFlowInstance | null;
  reactFlowWrapper: MutableRefObject<HTMLDivElement | null>;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onInit: OnInit;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  setNode: (nodes: Node) => void;
  setEdge: (edges: Edge) => void;
  setReactFlowWrapper: (
    reactFlowWrapper: MutableRefObject<HTMLDivElement | null>
  ) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<RFState>((set, get) => ({
  nodes: [],
  edges: [],
  reactFlowInstance: null,
  reactFlowWrapper: null as any,
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
  onInit: (flowInstance: ReactFlowInstance) => {
    if (get().reactFlowInstance == null) {
      set({ reactFlowInstance: flowInstance });
    }
  },
  onDrop: (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const reactFlowBounds =
      get().reactFlowWrapper.current?.getBoundingClientRect();
    console.log(reactFlowBounds);

    const type = event.dataTransfer.getData("application/reactflow");

    // check if the dropped element is valid
    if (typeof type === "undefined" || !type) {
      return;
    }

    const position = get().reactFlowInstance?.project({
      x: event.clientX - reactFlowBounds!.left,
      y: event.clientY - reactFlowBounds!.top,
    });

    set({
      nodes: [...get().nodes, createNode(type as any, position!)],
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
  setReactFlowWrapper: (
    reactFlowWrapper: MutableRefObject<HTMLDivElement | null>
  ) => {
    set({
      reactFlowWrapper: reactFlowWrapper,
    });
  },
}));

export default useStore;
