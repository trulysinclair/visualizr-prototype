import {
  Arrow,
  Content,
  HoverCard,
  Portal,
  Trigger,
} from "@radix-ui/react-hover-card";
import clsx from "clsx";
import React from "react";
import { validate } from "uuid";

type MyPopoverProps = {
  icon: React.ReactElement;
  title: string;
};

function Hover(props: MyPopoverProps) {
  return (
    <HoverCard>
      <Trigger asChild>
        {React.cloneElement(props.icon, { width: 14 })}
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
