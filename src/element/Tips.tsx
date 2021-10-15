import { JSXElement } from "solid-js";
import tippy, { Instance, Placement } from "tippy.js";
import { classTipsContent, classTipsTrigger } from "./Tips.css";

type TipsProps = {
  tips?: Instance;
  placement?: Placement;
  children: JSXElement
};
export default function Tips(props: TipsProps) {
  let trigger: HTMLDivElement;
  let content: HTMLDivElement;

  onMount(() => {
    const tips = tippy(trigger, {
      appendTo: document.querySelector(".bp-app") as HTMLDivElement,
      content,
      hideOnClick: true,
      interactive: true,
      animation: "scale",
      placement: props.placement || "bottom-start",
    });

    onCleanup(tips.destroy);

    props.tips = tips;
  });

  return (
    <>
      <div
        //@ts-ignore
        ref={trigger}
      >
        <div class={classTipsTrigger}>
          <IconIcOutlineTipsAndUpdates />
          <span style="margin-left: 0.25rem;">Tips</span>
        </div>
      </div>

      <div
        //@ts-ignore
        ref={content}
        class={classTipsContent}
        tabindex="-1"
      >
        {props.children}
      </div>
    </>
  );
}
