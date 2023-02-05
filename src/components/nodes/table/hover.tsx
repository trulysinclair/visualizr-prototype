import useVisualizrStore from "@/util/store/use-visualizr-store";
import {
  Arrow,
  Content,
  HoverCard,
  Portal,
  Trigger,
} from "@radix-ui/react-hover-card";
import * as Toggle from "@radix-ui/react-toggle";
import React from "react";
import { useNodeId } from "reactflow";

type MyPopoverProps = {
  icon: React.ReactElement;
  title: string;
  onClick: () => void;
};

function Hover(props: MyPopoverProps) {
  const updateNode = useVisualizrStore();
  const nodeId = useNodeId()!;

  return (
    <HoverCard>
      <Trigger asChild>
        <Toggle.Root onPressedChange={(pressed) => props.onClick()}>
          {React.cloneElement(props.icon, { width: 14 })}
        </Toggle.Root>
      </Trigger>
      <Portal>
        <Content className="rounded bg-input-background p-2 text-white shadow-md">
          <span>{props.title}</span>
          <Arrow className="fill-neutral-400" />
        </Content>
      </Portal>
    </HoverCard>
  );
}

export default Hover;
