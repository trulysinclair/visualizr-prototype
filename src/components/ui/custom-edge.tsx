import React from "react";
import { EdgeProps, getBezierPath } from "reactflow";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
  markerStart
}: EdgeProps<{text:string}>) {
  const [edgePath] = getBezierPath({
    sourceX: sourceX + 20,
    sourceY,
    sourcePosition,
    targetX: targetX - 20,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path stroke-accent-orange"
        d={edgePath}
        markerStart={markerStart}
        markerEnd={markerEnd}
      />
      {/* <text>
        <textPath
          href={`#${id}`}
          style={{ fontSize: 12 }}
          startOffset="50%"
          textAnchor="middle"
        >
          {data!.text}
        </textPath>
      </text> */}
    </>
  );
}
