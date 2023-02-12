import { MarkerDefinition } from "@/components/ui/markers/Marker";
import { Fragment } from "react";

export const MarkerDefinitions = ({ strokeColor }: { strokeColor: string }) => (
  <Fragment>
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
  </Fragment>
);
