import clsx from "clsx";
import { Accessor, JSXElement, Setter } from "solid-js";
import Button from "./Button";
import {
  classDialog,
  classDialogResizer,
  classDialogTitle,
  classDialogVisible,
} from "./Dialog.css";
import Tips from "./Tips";

export type DialogProps = {
  title: string;
  model: [Accessor<boolean>, () => void];
  children: JSXElement;
  tips?: JSXElement;
  isDraggable?: boolean;
  isResizable?: boolean;
};

export default function Dialog(
  {
    title,
    model: [isVisible, onClose],
    children,
    tips,
    isDraggable = false,
    isResizable = false,
  }: DialogProps,
) {
  const startingPos = `left: 200px; top: 50px`;

  return (
    <div
      class={clsx(
        "bp-card--patern",
        classDialog,
        isVisible() && classDialogVisible,
      )}
      style={startingPos}
      data-draggable={isDraggable}
      data-resizable={isResizable}
      use:dialogWithMouse
    >
      <div class="relative bp-card p-2">
        <div class="flex justify-between">
          <div
            class={clsx(classDialogTitle, isDraggable && "drag-handler")}
          >
            <IconIcRoundDragIndicator />
            <span class="ml-2">
              {title}
            </span>
          </div>
          <div class="actions">
            <Show when={tips}>
              <Tips>
                {tips}
              </Tips>
            </Show>
            <Button
              onClick={onClose}
              style="margin-left: 1rem"
            >
              <IconFeatherX />
            </Button>
          </div>
        </div>

        <div class="mt-4">
          <Show when={isVisible()}>
            {children}
          </Show>
        </div>

        <Show when={isResizable}>
          <div style="height: 16px" />
          <div class={clsx("resize-handler", classDialogResizer)}>
            <IconMdiResizeBottomRight />
          </div>
        </Show>
      </div>
    </div>
  );
}
