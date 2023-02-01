import Table from "@/components/table/table";
import CustomEdge from "@/components/ui/custom-edge";
import { MarkerDefinition } from "@/components/ui/marker";
import { SurfaceAppbar } from "@/components/ui/surface-appbar";
import { Toolbar } from "@/components/ui/toolbar";
import { createNode } from "@/util/createNode";
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
  Panel,
  ReactFlowInstance,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { Sidebar } from "./sidebar";
import { shallow } from "zustand/shallow";
import useStore, { RFState } from "@/util/store";
import { MarkerDefinitions } from "./marker-definitions";

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  reactFlowInstance: state.reactFlowInstance,
  reactFlowWrapper: state.reactFlowWrapper,
  onDrop: state.onDrop,
  onInit: state.onInit,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setEdge: state.setEdge,
  setNode: state.setNode,
  setReactFlowWrapper: state.setReactFlowWrapper,

const Surface = () => {
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onInit,
    onDrop,
    setReactFlowWrapper,
    reactFlowInstance,
  } = useStore(selector, shallow);
  const [snapToGrid, setSnapToGrid] = useState(false);

  const strokeColor = "stroke-accent-orange";


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
