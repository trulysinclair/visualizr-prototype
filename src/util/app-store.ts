import { FunctionNode } from "@/types/function";
import { ITable, TableNode } from "@/types/table";
import { TriggerNode } from "@/types/trigger";
import { createNode } from "@/util/create-node";
import { Notification } from "@/util/notification-store";
import refineToYaml from "@/util/refine-to-sql";
import { dump, YAMLException } from "js-yaml";
import { MutableRefObject, DragEvent, MouseEvent } from "react";
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

export type VisualizrNodes = TableNode[] | FunctionNode[] | TriggerNode[];

export type ActionDispatcher<Element> = (
  event: MouseEvent<Element>,
  notifier: (notification: Notification) => void
) => void;

export type VisualizrAppState = {
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
  getNode: <N extends TableNode | FunctionNode | TriggerNode>(id: string) => N;
  setEdge: (edges: Edge) => void;
  setReactFlowWrapper: (
    reactFlowWrapper: MutableRefObject<HTMLDivElement | null>
  ) => void;
  onSave: ActionDispatcher<HTMLButtonElement>;
  onLoad: ActionDispatcher<HTMLButtonElement>;
  onImport: ActionDispatcher<HTMLButtonElement>;
  onExport: ActionDispatcher<HTMLButtonElement>;
  updateNode: (id: string, nodeData: Partial<ITable>) => void;
};

const useAppStore = create<VisualizrAppState>((set, get) => ({
  nodes: [],
  edges: [],
  reactFlowInstance: null,
  reactFlowWrapper: null as any,
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes) as Node[],
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
          type: "relationship",
          animated: true,
          data: { label: "Custom edge", text: "one-many" },
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
      nodes: [...get().nodes, createNode(type as any, position!)] as (
        | TableNode
        | FunctionNode
        | TriggerNode
      )[],
    });
  },
  // TODO: Refactor this to use a generic type
  getNode: <N extends TableNode | FunctionNode | TriggerNode>(id: string) => {
    return get().nodes.find((node) => node.id === id) as N;
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
  onSave: (event, dispatchNotification) => {
    event.preventDefault();

    const data = {
      nodes: get().nodes,
      edges: get().edges,
    };

    try {
      localStorage.setItem("reactflow", JSON.stringify(data));

      dispatchNotification({
        title: "Saved",
        message: "Your data has been saved.",
        type: "success",
      });
    } catch (error) {
      dispatchNotification({
        title: "Error",
        message: "Unknown error occurred.",
        type: "error",
      });
    }
  },
  onLoad: (event, dispatchNotification) => {
    event.preventDefault();

    try {
      if (localStorage.getItem("reactflow") == null) {
        throw new Error("There is no data to load.");
      } else {
        const data = JSON.parse(localStorage.getItem("reactflow")!);

        set({
          nodes: data.nodes,
          edges: data.edges,
        });

        dispatchNotification({
          title: "Loaded",
          message: "Your data has been loaded.",
          type: "success",
        });
      }
    } catch (error) {
      dispatchNotification({
        title: "Error",
        message: `${error}`,
        type: "error",
      });
    }
  },
  onImport: (event, dispatchNotification) => {
    event.preventDefault();

    try {
      dispatchNotification({
        title: "Loaded",
        message: "Your data has been loaded.",
        type: "success",
      });
    } catch (error) {
      dispatchNotification({
        title: "Error",
        message: `${error}`,
        type: "error",
      });
    }
  },
  onExport: (event, dispatchNotification) => {
    event.preventDefault();

    try {
      const appState = get().reactFlowInstance?.toObject();

      if (appState?.nodes.length == 0)
        throw new Error("There is no data to export.");

      const data = {
        nodes: appState?.nodes,
        edges: appState?.edges,
      };

      const dataDump = dump(data);

      console.log(dataDump);

      refineToYaml(appState!);

      dispatchNotification({
        title: "Exported",
        message: "Your data has been exported.",
        type: "success",
      });
    } catch (error) {
      dispatchNotification({
        title: "Error",
        message: `${error}`,
        type: "error",
      });
    }
  },
  updateNode: (id: string, data: Partial<ITable>) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id == id) {
          node.data = {
            ...node.data,
            ...data,
          };
        }

        return node;
      }) as TableNode[],
    });
  },
}));

export default useAppStore;
