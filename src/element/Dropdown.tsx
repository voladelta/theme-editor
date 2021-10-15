import { JSXElement } from "solid-js";
import tippy, { Instance, Placement } from "tippy.js";
import { classDropdownContent } from "./Dropdown.css";
import { classTipsContent, classTipsTrigger } from "./Tips.css";

type TipsProps = {
  dropdown?: Instance;
  placement?: Placement;
  trigger: JSXElement
  children: JSXElement
};
export default function Dropdown(props: TipsProps) {
  let triggerEl: HTMLDivElement;
  let contentEl: HTMLDivElement;

  onMount(() => {
    const dropdown = tippy(triggerEl, {
      appendTo: document.querySelector(".bp-app") as HTMLDivElement,
      content: contentEl,
      trigger: "click",
      hideOnClick: true,
      interactive: true,
      animation: "scale",
      placement: props.placement || "bottom-start",
    });

    onCleanup(dropdown.destroy);

    props.dropdown = dropdown;
  });

  return (
    <>
      <div
        //@ts-ignore
        ref={triggerEl}
      >
        {props.trigger}
      </div>

      <div
        //@ts-ignore
        ref={contentEl}
        class={classDropdownContent}
        tabindex="-1"
      >
        {props.children}
      </div>
    </>
  );
}
