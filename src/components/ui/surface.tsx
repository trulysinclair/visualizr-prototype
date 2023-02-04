import Table from "@/components/table/table";
import CustomEdge from "@/components/ui/custom-edge";
import { SurfaceAppbar } from "@/components/ui/appbar";
import { Toolbar } from "@/components/ui/toolbar";
import { createNode } from "@/util/create-node";
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
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MiniMap,
  ReactFlowInstance,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { Sidebar } from "./sidebar";
import { shallow } from "zustand/shallow";
import useAppStore, { VisualizrAppState } from "@/util/app-store";
import NotificationWrapper from "@/components/ui/notifications/notification-wrapper";
import { MarkerDefinitions } from "./markers/marker-definitions";

const selector = (state: VisualizrAppState) => ({
  nodes: state.nodes,
  edges: state.edges,
  reactFlowInstance: state.reactFlowInstance,
  setReactFlowWrapper: state.setReactFlowWrapper,
  onInit: state.onInit,
  onDrop: state.onDrop,
  onConnect: state.onConnect,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
});

const Surface = () => {
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const {
    nodes,
    edges,
    reactFlowInstance,
    setReactFlowWrapper,
    onInit,
    onDrop,
    onConnect,
    onNodesChange,
    onEdgesChange,
  } = useAppStore(selector, shallow);
  const [snapToGrid, setSnapToGrid] = useState(false);
  // const [dragImage, setDragImage] = useState<HTMLDivElement>(new Image());

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const nodeTypes = useMemo(
    () => ({
      table: Table,
    }),
    []
  );

  const edgeTypes = useMemo(
    () => ({
      custom: CustomEdge,
    }),
    []
  );

  useEffect(() => {
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

    setReactFlowWrapper(reactFlowWrapper);
  }, [reactFlowInstance, setReactFlowWrapper]);

  return (
    <main className="h-screen w-full bg-black">
      <ReactFlowProvider>
        <div
          className="relative h-full w-full overflow-hidden rounded-3xl bg-white"
          ref={reactFlowWrapper}
        >
          <SurfaceAppbar />
          <NotificationWrapper duration={3000} />
          <ReactFlow
            nodes={nodes}
            edges={edges}
            deleteKeyCode={"Delete"}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            onError={(error) => console.log(error)}
            edgeTypes={edgeTypes}
            defaultViewport={{ zoom: 1.5, x: 0, y: 0 }}
            onConnect={onConnect}
            onInit={onInit}
            onDrop={onDrop}
            snapGrid={[10, 10]}
            snapToGrid={snapToGrid}
            onDragOver={onDragOver}
          >
            <Controls
              position="bottom-right"
              className="z-20 overflow-hidden rounded border-b-secondary bg-input-background"
            />
            <MarkerDefinitions strokeColor="stroke-accent-orange" />
            <MiniMap position="bottom-left" className="z-20" />
            <Toolbar />
            <Sidebar />
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
};

export default Surface;
