import * as RadixSelect from "@radix-ui/react-select";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import clsx from "clsx";
import React, { forwardRef } from "react";

type SelectProps = {
  options?: string[];
  value?: string;
  name?: string;
  onChange?: (value: string) => void;
};

const SidebarSelect = ({ name, options, value, onChange }: SelectProps) => (
  <div className="group/input relative h-full w-40 rounded-xl border-2 border-input-background transition-colors duration-150 focus-within:border-accent-orange">
    {name && (
      <label
        htmlFor={name}
        className="absolute left-2 -translate-y-1/2 bg-primary px-1 text-sm text-white"
      >
        {name}
      </label>
    )}
    <RadixSelect.Root
      value={value}
      onValueChange={(newValue: string) => {
        onChange?.(newValue);
      }}
    >
      <RadixSelect.Trigger className="flex h-full w-full items-center rounded-lg px-2 text-base text-gray-400 outline-none data-[placeholder]:text-gray-400 hover:data-[placeholder]:text-white">
        <RadixSelect.Value placeholder="Select" />
        <div className="grow" />
        <RadixSelect.Icon className="text-gray-500 ">
          <IconChevronDown />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content className="-ml-[0.14rem] w-40 overflow-hidden rounded-md bg-secondary">
          <RadixSelect.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-primary text-gray-300">
            <IconChevronUp />
          </RadixSelect.ScrollUpButton>
          <RadixSelect.Viewport className="">
            {options?.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}

            {/* <RadixSelect.Group>
              <RadixSelect.Label />
              <RadixSelect.Item value="">
                <RadixSelect.ItemText />
                <RadixSelect.ItemIndicator />
              </RadixSelect.Item>
            </RadixSelect.Group>
            <RadixSelect.Separator /> */}
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-primary text-gray-300">
            <IconChevronDown />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  </div>
);

type SelectItemProps = {
  children: React.ReactNode;
  className?: string;
  value: string;
};

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <RadixSelect.Item
        className={clsx(
          "relative flex h-7 w-40 select-none items-center px-2 leading-none text-gray-400 data-[disabled]:pointer-events-none data-[state=checked]:bg-input-background data-[highlighted]:bg-input-background/50 data-[state=checked]:text-white data-[disabled]:text-gray-700 data-[highlighted]:text-white data-[highlighted]:outline-none",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
        {/* <RadixSelect.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
          <IconCheck className="h-4 text-white" />
        </RadixSelect.ItemIndicator> */}
      </RadixSelect.Item>
    );
  }
);

SelectItem.displayName = "SelectItem";

export default SidebarSelect;
