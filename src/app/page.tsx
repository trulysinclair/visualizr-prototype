"use client";
import { SurfaceAppbar } from "@/components/ui/surface-appbar";
import Table from "@/components/table/table";
import { Toolbar } from "@/components/ui/toolbar";
import {
  DragEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  MarkerType,
  MiniMap,
  Node,
  NodeTypes,
  Panel,
  ReactFlowInstance,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { v4 } from "uuid";
import { TableNode } from "../types/table-node";
import fav from "~/public/favicon.ico";
import { MarkerDefinition } from "@/components/ui/marker";
import CustomEdge from "@/components/ui/custom-edge";

const node1 = v4();
const node2 = v4();

const initialNodes: TableNode[] = [
  {
    id: node1,
    type: "custom",
    data: {
      title: "New Table",
      description: "description",
      columns: [
        { name: "id", type: "int" },
        { name: "name", type: "string" },
        { name: "email", type: "string" },
      ],
    },
    position: { x: 0, y: 100 },
  },
  {
    id: node2,
    type: "custom",
    data: {
      title: "New Table",
      description: "description",
      columns: [
        { name: "id", type: "int" },
        { name: "name", type: "string" },
        { name: "email", type: "string" },
      ],
    },
    position: { x: 300, y: 100 },
  },
];

const strokeColor = "#b1b1b7";

const initialEdges: Edge[] = [
  {
    id: v4(),
    source: node1,
    target: node2,
    data: {
      text: "test",
    },
    type: "custom",
    markerStart: "start-one",
    markerEnd: "end-many",
    label: "1 to many",
  },
];

export default function Home() {
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);

  const [dragImage, setDragImage] = useState<HTMLDivElement>(new Image());
  const [reactflowInstance, setReactflowInstance] =
    useState<ReactFlowInstance | null>(null);
  /** When the user holds `Shift`, we enable snapping. */
  const [snapToGrid, setSnapToGrid] = useState(false);

  // refer to https://reactflow.dev/docs/examples/edges/edge-with-button/ for custom edges
  const edgeTypes = useMemo(
    () => ({
      custom: CustomEdge,
    }),
    []
  );

  /**
   * When the graph is updated, update the nodes and edges.
   */
  const nodeTypes = useMemo(
    () => ({
      custom: Table,
    }),
    []
  );

  /**
   * When a connection is made, update the graph.
   */
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((edges) =>
        addEdge(
          {
            ...connection,
            type: "custom",
            data: { text: "test" },
            markerEnd: "end-many",
            markerStart: "start-one",
          },
          edges
        )
      );
    },

    [setEdges]
  );

  // TODO: Currently broken, fix later.
  useEffect(() => {
    const image = new Image(20);
    image.src = fav.src;

    image.onload = () => {
      console.log("loaded");
      setDragImage(image);
    };

    // setDragImage(image);
  }, [setDragImage]);

  /**
   * When a node is dragged, update the graph.
   */
  const onDragOver = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.setDragImage(dragImage, 0, 0);
    },
    [dragImage]
  );

  /**
   * When a node is dropped, add it to the graph.
   */
  const onDrop = useCallback(
    (event: {
      preventDefault: () => void;
      dataTransfer: { getData: (arg0: string) => any };
      clientX: number;
      clientY: number;
    }) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      console.log(reactFlowBounds);

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactflowInstance?.project({
        x: event.clientX - reactFlowBounds!.left,
        y: event.clientY - reactFlowBounds!.top,
      });

      const newNode: TableNode = {
        id: v4(),
        type,
        position: position!,
        data: {
          title: `New Table`,
          description: "description",
          columns: [
            { name: "id", type: "int" },
            { name: "name", type: "string" },
            { name: "email", type: "string" },
          ],
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactflowInstance, setNodes]
  );

  /**
   * When the graph is initialized, set the nodes and edges.
   */
  const onInit = useCallback(
    (flowInstance: ReactFlowInstance) => {
      setNodes([...nodes]);
      setEdges([...edges]);

      if (!reactflowInstance) {
        setReactflowInstance(flowInstance);
      }
    },
    [nodes, edges, setNodes, setEdges, reactflowInstance]
  );

  /**
   * When the graph is updated, set the nodes and edges.
   */
  useEffect(() => {
    // listen for shift key to toggle snap to grid
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Shift") {
        setSnapToGrid(true);
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Shift") {
        setSnapToGrid(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
  }, [reactflowInstance]);

  return (
    <main className="h-screen w-full bg-black">
      <ReactFlowProvider>
        <div
          className="relative h-full w-full rounded-2xl bg-white"
          ref={reactFlowWrapper}
        >
          <SurfaceAppbar />
          <ReactFlow
            nodes={nodes}
            edges={edges}
            deleteKeyCode={"Delete"}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onConnect={onConnect}
            onInit={onInit}
            onDrop={onDrop}
            snapGrid={[10, 10]}
            snapToGrid={snapToGrid}
            onDragOver={onDragOver}
            fitView
          >
            <Controls
              position="bottom-right"
              className="z-20 rounded bg-white"
            />
            <MarkerDefinition id="start-one" color={strokeColor} />
            <MarkerDefinition id="start-many" color={strokeColor} />
            <MarkerDefinition id="start-zero-or-one" color={strokeColor} />
            <MarkerDefinition id="start-one-or-many" color={strokeColor} />
            <MarkerDefinition id="start-zero-or-many" color={strokeColor} />
            <MarkerDefinition id="end-one" color={strokeColor} />
            <MarkerDefinition id="end-many" color={strokeColor} />
            <MarkerDefinition id="end-zero-or-one" color={strokeColor} />
            <MarkerDefinition id="end-one-or-many" color={strokeColor} />
            <MarkerDefinition id="end-zero-or-many" color={strokeColor} />
            <MiniMap position="bottom-left" className="z-20" />
            <Toolbar />
            <Panel
              position="top-right"
              className="!inset-y-0 !right-0 flex items-center"
            >
              <div className="space-y-2 rounded-2xl border bg-gray-100 p-4 text-black shadow-md">
                Sidebar
              </div>
            </Panel>
            <Background />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </main>
  );
}
