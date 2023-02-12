import { FunctionNode } from "@/types/function";
import { Slice } from "@/types/store";
import { ITable, TableNode } from "@/types/table";
import { TriggerNode } from "@/types/trigger";
import { createNode } from "@/util/create-node";
import generateSQL from "@/util/refine-to-sql";
import { Notification } from "@/util/store/notification-slice";
import produce from "immer";
import { DragEvent, MouseEvent, MutableRefObject } from "react";
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

export type VisualizrNodes = TableNode[] | FunctionNode[] | TriggerNode[];

export type ActionDispatcher<Element> = (
  event: MouseEvent<Element>,
  notifier: (notification: Notification) => void
) => void;

export type AppSlice = {
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
  onSelectionChange: ({
    nodes,
    edges,
  }: {
    nodes: TableNode[];
    edges: Edge[];
  }) => void;
  setReactFlowWrapper: (
    reactFlowWrapper: MutableRefObject<HTMLDivElement | null>
  ) => void;
  onSave: ActionDispatcher<HTMLButtonElement>;
  onLoad: ActionDispatcher<HTMLButtonElement>;
  onImport: ActionDispatcher<HTMLButtonElement>;
  onExport: ActionDispatcher<HTMLButtonElement>;
  updateNode: (id: string, nodeData: Partial<ITable>) => void;
};

const createAppSlice: Slice<AppSlice> = (set, get) => ({
  nodes: [],
  edges: [],
  reactFlowInstance: null,
  reactFlowWrapper: null as any,
  onNodesChange: (changes: NodeChange[]) => {
    console.log("onNodesChange");

    set({
      nodes: applyNodeChanges(changes, get().nodes) as Node[],
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    console.log("onEdgesChange");

    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    console.log("onConnect");

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
    console.log("onInit");

    if (get().reactFlowInstance == null) {
      set({ reactFlowInstance: flowInstance });
    }
  },
  onDrop: (event: DragEvent<HTMLDivElement>) => {
    console.log("onDrop");

    event.preventDefault();

    if (get().reactFlowInstance == null) {
      console.log("reactFlowInstance is null");
      window.location.reload();
      return;
    }

    const reactFlowBounds =
      get().reactFlowWrapper.current?.getBoundingClientRect();

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
      nodes: [
        ...get().nodes,
        createNode(type as "table" | "function" | "trigger", position!),
      ] as (TableNode | FunctionNode | TriggerNode)[],
    });
  },
  getNode: <N extends TableNode | FunctionNode | TriggerNode>(id: string) => {
    return get().nodes.find((node) => node.id === id) as N;
  },
  setNode: (node: Node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  updateNode: (id: string, data: Partial<ITable>) => {
    // if node data matches the existing node data, do nothing
    console.log(get().getNode<TableNode>(id).data, data);
    if (get().getNode<TableNode>(id).data === data) {
      return;
    } else
      set({
        nodes: produce(get().nodes, (draft: TableNode[]) => {
          const node = draft.find((node) => node.id == id);

          if (node) {
            node.data = {
              ...node.data,
              ...data,
            };
          }
        }),
      });
  },
  onSelectionChange: ({
    nodes,
    edges,
  }: {
    nodes: (TableNode | FunctionNode | TriggerNode)[];
    edges: Edge[];
  }) => {
    console.log("onSelectionChange");

    if (nodes.length === 1) {
      const node = nodes[0];

      if (node.type === "table") {
        const tableNode = get().getNode<TableNode>(node.id);

        console.log(tableNode.data);

        get().setTableToEdit({ id: tableNode.id, data: tableNode.data });
      }

      if (node.type === "function") {
        const functionNode = get().getNode<FunctionNode>(node.id);

        console.log(functionNode.data);
      }

      if (node.type === "trigger") {
        const triggerNode = get().getNode<TriggerNode>(node.id);

        console.log(triggerNode.data);
      }
    }

    if (edges.length === 1) {
      const edge = edges[0];

      console.log(edge.data);
    }

    if (nodes.length === 0 && edges.length === 0) {
      console.log("nothing selected");
      get().setTableToEdit(null);
    }

    if (nodes.length > 1 || edges.length > 1) {
      console.log("multiple selected");
    }
  },
  setEdge: (edges: Edge) => {
    console.log("setEdge");

    set({
      edges: [...get().edges, edges],
    });
  },
  setReactFlowWrapper: (
    reactFlowWrapper: MutableRefObject<HTMLDivElement | null>
  ) => {
    if (get().reactFlowWrapper == null) {
      console.log("setReactFlowWrapper");

      set({
        reactFlowWrapper: reactFlowWrapper,
      });
    }
  },
  onSave: (event, dispatchNotification) => {
    console.log("onSave");

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
    console.log("onLoad");

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
    console.log("onImport");

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
    console.log("onExport");

    event.preventDefault();

    try {
      const appState = get().reactFlowInstance?.toObject();

      if (appState?.nodes.length == 0)
        throw new Error("There is no data to export.");

      // const data = {
      //   nodes: appState?.nodes,
      //   edges: appState?.edges,
      // };

      // const dataDump = dump(data);

      const generatedSQL = generateSQL(appState!);
      const file = new Blob([generatedSQL], { type: "text/plain" });
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "generated.sql");
      link.click();

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
});

export default createAppSlice;
