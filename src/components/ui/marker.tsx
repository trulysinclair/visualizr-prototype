import React, { ReactNode } from "react";
import { render } from "react-dom";

interface MarkerProps {
  id: string;
  className?: string;
  children: ReactNode;
}

const Marker = ({ id, className, children }: MarkerProps) => (
  <marker
    className={className || "react-flow__arrowhead"}
    id={id}
    markerWidth="20"
    markerHeight="20"
    width={20}
    height={20}
    orient={0}
    markerUnits="userSpaceOnUse"
    refX={id.startsWith('start')?20: 0}
    refY="10"
  >
    {children}
  </marker>
);

interface MarkerDefinitionsProps {
  color: string;
  id:
    | "start-many"
    | "end-many"
    | "start-one"
    | "end-one"
    | "start-one-only"
    | "end-one-only"
    | "start-zero-or-one"
    | "end-zero-or-one"
    | "start-zero-or-many"
    | "end-zero-or-many"
    | "start-one-or-many"
    | "end-one-or-many";
    
}

export function MarkerDefinition({ color, id }: MarkerDefinitionsProps) {
  function renderMarker() {
    switch (id) {
      case "start-many":
        return (
          <>
            <line x1={0} y1={0} x2={20} y2={10} stroke={color} />
            <line x1={0} y1={10} x2={20} y2={10} stroke={color} />
            <line x1={0} y1={20} x2={20} y2={10} stroke={color} />
          </>
        );
      case "start-one":
        return (
          <>
            <line x1={10} y1={5} x2={10} y2={15} stroke={color} />
            <line x1={0} y1={10} x2={20} y2={10} stroke={color} />
          </>
        );
      case "start-one-only":
        return (
          <>
            <line x1={10} y1={5} x2={10} y2={15} stroke={color} />
          </>
        );
      case "start-zero-or-one":
        return (
          <>
            <line x1={10} y1={5} x2={10} y2={15} stroke={color} />
          </>
        );
      case "start-one-or-many":
        return (
          <>
            <line x1={10} y1={5} x2={10} y2={15} stroke={color} />
          </>
        );
      case "start-zero-or-many":
        return (
          <>
            <line x1={10} y1={5} x2={10} y2={15} stroke={color} />
          </>
        );
    }
  }
  return (
    <svg>
      <defs>
        <Marker id={id}>{renderMarker()}</Marker>
      </defs>
    </svg>
  );
}
