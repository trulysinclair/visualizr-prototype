import {
  Arrow,
  Content,
  HoverCard,
  Portal,
  Trigger,
} from "@radix-ui/react-hover-card";
import * as Toggle from "@radix-ui/react-toggle";
import React from "react";

type MyPopoverProps = {
  icon: React.ReactElement;
  title: string;
  width?: number;
  onClick?: () => void;
};

function Hover(props: MyPopoverProps) {
  // const updateNode = useVisualizrStore();
  // const nodeId = useNodeId()!;

  return (
    <HoverCard>
      <Trigger asChild>
        <Toggle.Root
          onPressedChange={(pressed) =>
            props.onClick ? props.onClick() : null
          }
        >
          {React.cloneElement(props.icon, {
            width: props.width ? props.width : 14,
          })}
        </Toggle.Root>
      </Trigger>
      <Portal>
        <Content className="rounded bg-input-background p-2 text-white shadow-md">
          <span>{props.title}</span>
          <Arrow className="fill-input-background" />
        </Content>
      </Portal>
    </HoverCard>
  );
}

export default Hover;
