"use client";

import Table from "@/components/table/table";
import CustomEdge from "@/components/ui/custom-edge";
import { MarkerDefinition } from "@/components/ui/marker";
import { SurfaceAppbar } from "@/components/ui/surface-appbar";
import { Toolbar } from "@/components/ui/toolbar";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  DragEvent,
} from "react";
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Panel,
  ReactFlowInstance,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { v4 } from "uuid";
import { PSQLCharacterType, PSQLNumericType } from "../types/postgresql";
import { TableNode } from "../types/table";

const initialNodes: TableNode[] = [];

const strokeColor = "stroke-accent-orange";

const initialEdges: Edge[] = [];

export default function Home() {
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);

  // const [dragImage, setDragImage] = useState<HTMLDivElement>(new Image());
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
   * Define the Node types.
   */
  const nodeTypes = useMemo(
    () => ({
      table: Table,
    }),
    []
  );

  // get all nodes and edges from the graph and save them to the database (or local storage)
  const onSave = useCallback(() => {
    console.log("nodes", nodes);
    console.log("edges", edges);
  }, [nodes, edges]);

  /**
   * When a connection is made, update the graph.
   */
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((edges) =>
        addEdge(
          {
            ...connection,
            id: v4(),
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

  //#region broken drag image
  // TODO: Currently broken, fix later.
  // useEffect(() => {
  // const image = new Image(20);
  // image.src = fav.src;

  // image.onload = () => {
  //   console.log("loaded");
  //   setDragImage(image);
  // };

  // setDragImage(image);
  // }, [setDragImage]);

  /**
   * When a node is dragged, update the graph.
   */
  // const onDragOver = useCallback(
  //   (event: DragEvent<HTMLDivElement>) => {
  //     event.preventDefault();

  //     event.dataTransfer.dropEffect = "move";
  //     event.dataTransfer.setDragImage(dragImage, 0, 0);
  //   },
  //   [dragImage]
  // );
  //#endregion
  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    event.dataTransfer.dropEffect = "move";
  }, []);

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
            {
              name: "id",
              type: PSQLNumericType.SERIAL,
              isPrimaryKey: true,

              isUnique: false,
              isNullable: false,
              isAutoIncrement: true,
              foreignKey: { table: "", column: "" },
              length: 0,
              defaultValue: "",
              description: "",
            },
            {
              name: "name",
              type: PSQLCharacterType.TEXT,
              isPrimaryKey: true,

              isUnique: false,
              isNullable: false,
              isAutoIncrement: true,
              foreignKey: null,
              length: 0,
              defaultValue: "",
              description: "",
            },
            {
              name: "id",
              type: PSQLCharacterType.TEXT,
              isPrimaryKey: true,
              isUnique: false,
              isNullable: false,
              isAutoIncrement: true,
              foreignKey: null,
              length: 0,
              defaultValue: "",
              description: "",
            },
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
          className="relative h-full w-full overflow-hidden rounded-3xl bg-white"
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
              className="z-20 overflow-hidden rounded border-b-secondary bg-input-background"
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
              <div className="space-y-2 rounded-2xl bg-primary p-4 text-white shadow-md">
                Sidebar
              </div>
            </Panel>
            <Background
              color="#374151"
              className="bg-gray-800 fill-white"
              variant={BackgroundVariant.Lines}
            />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </main>
  );
}
