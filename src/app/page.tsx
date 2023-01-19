"use client";
import { Squares2X2Icon, TableCellsIcon } from "@heroicons/react/24/outline";
import { Inter } from "@next/font/google";
import { DragEvent, useCallback, useEffect, useRef, useState } from "react";
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
import { SurfaceAppbar } from "./SurfaceAppbar";
import Table from "./table";

const inter = Inter({ subsets: ["latin"] });

const initialNodes: Node[] = [
  {
    id: "dndnode_0",
    type: "input",
    data: {
      label: "input node",
      description: "description",
      columns: [
        { name: "id", type: "int" },
        { name: "name", type: "string" },
        { name: "email", type: "string" },
      ],
    },
    position: { x: 250, y: 5 },
  },
  {
    id: "dndnode_1",
    type: "custom",
    data: { label: "custom node", description: "description",columns: [
      { name: "id", type: "int" },
      { name: "name", type: "string" },
      { name: "email", type: "string" },
    ], },
    position: { x: 100, y: 100 },
  },
];

const initialEdges: Edge[] = [];

const nodeTypes: NodeTypes = {
  custom: Table,
};

let id = initialNodes.length;
const getId = () => `dndnode_${id++}`;

export default function Home() {
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);
  const [reactflowInstance, setReactflowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [snapToGrid, setSnapToGrid] = useState(false);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: "black",
              width: 10,
              height: 10,
            },
          },
          eds
        )
      );
      console.log(connection);
    },

    [setEdges]
  );

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

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

      const newNode: Node = {
        id: getId(),
        type,
        position: position!,
        data: { label: `${type} node`, description: "description" },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactflowInstance, setNodes]
  );

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

  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <main className="h-screen w-full bg-black">
      <ReactFlowProvider>
        <div className="relative h-full w-full rounded-2xl bg-white" ref={reactFlowWrapper}>
          <SurfaceAppbar />
          <ReactFlow
            nodes={nodes}
            edges={edges}
            
            deleteKeyCode={'Delete'}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            onConnect={onConnect}
            onInit={onInit}
            onDrop={onDrop}
            snapGrid={[10, 10]}
            snapToGrid={snapToGrid}
            onDragOver={onDragOver}
            fitView
          >
            <Controls position="bottom-right" className="z-20 rounded bg-white" />
            <MiniMap position="bottom-left" className="z-20" />
            <Panel
              position="top-left"
              className="!inset-y-0 !left-0 flex items-center"
            >
              <div className="space-y-2 rounded-2xl border bg-gray-100 p-4 text-black shadow-md">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded bg-white p-2 shadow"
                  onDragStart={(event) => onDragStart(event, "default")}
                  draggable
                >
                  <TableCellsIcon className="h-6 w-6" />
                </div>
                <div
                  className="flex h-10 w-10 items-center justify-center rounded bg-white p-2 shadow"
                  onDragStart={(event) => onDragStart(event, "custom")}
                  draggable
                >
                  <Squares2X2Icon className="h-6 w-6" />
                </div>
              </div>
            </Panel>
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
