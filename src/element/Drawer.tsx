import {
  Accessor,
  createEffect,
  createSignal,
  JSX,
  JSXElement,
} from "solid-js";
import {
  drawerContent,
  drawerContentShowing,
  drawerHidden,
  drawerMask,
  drawerMaskShowing,
} from "./Drawer.css";

type DrawerProps = {
  width: string;
  onToggle: JSX.EventHandlerUnion<JSXElement, MouseEvent>;
  visible: Accessor<boolean>;
  children: JSXElement;
};

export default function Drawer(
  { visible, onToggle, width, children }: DrawerProps,
) {
  const [contentStyle, setContentStyle] = createSignal(
    visible() ? { ...drawerContentShowing, width } : { width, ...drawerHidden },
  );
  const [maskStyle, setMaskStyle] = createSignal(
    visible() ? drawerMaskShowing : drawerHidden,
  );

  createEffect(() => {
    if (visible()) {
      setContentStyle({ ...drawerContentShowing, width });
      setMaskStyle(drawerMaskShowing);
    } else {
      setContentStyle({ ...drawerHidden, width });
      setMaskStyle(drawerHidden);
    }
  });

  return (
    <>
      <div
        class={drawerContent}
        style={contentStyle()}
      >
        {children}
      </div>

      <div
        class={drawerMask}
        onClick={onToggle}
        style={maskStyle()}
      />
    </>
  );
}
