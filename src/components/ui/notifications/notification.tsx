import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import * as Toast from "@radix-ui/react-toast";
import { ReactNode } from "react";

export type NotificationProps = {
  children?: ReactNode;
  onDismiss?: () => void;
  message?: string;
  title: string;
};

const Notification = (props: NotificationProps) => (
  <Toast.Root
    className="relative flex rounded-lg border-2 border-accent-green bg-primary py-2 px-4 text-gray-200 shadow-lg"
    asChild
  >
    <div>
      <div className="flex items-center justify-center">
        <CheckCircleIcon className="mr-4 h-10 w-10 text-accent-green" />
      </div>
      <div>
        <Toast.Title className="text-lg font-medium">{props.title}</Toast.Title>
        <Toast.Description className="text-base">
          {props.children || props.message}
        </Toast.Description>
        <Toast.Close className="absolute top-2 right-2 z-30">
          <XMarkIcon width={16} height={16} />
        </Toast.Close>
      </div>
    </div>
  </Toast.Root>
);

export default Notification;
