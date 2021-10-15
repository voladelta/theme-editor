import { JSXElement } from "solid-js";
import { toolbarClass } from "./Toolbar.css";

type ToolbarProps = Record<string, any> & {
  custom?: string;
  children: JSXElement;
};

export default function Toolbar({ children }: ToolbarProps) {
  return (
    <div class={toolbarClass}>
      {children}
    </div>
  )
}
