import { JSXElement } from "solid-js";
import clsx from "clsx";
import { buttonBaseClass, buttonFlexClass } from "./Button.css";

type ButtonProps = Record<string, any> & {
  children: JSXElement;
};

export default function Button(props: ButtonProps) {
  const [local, others] = splitProps(props, ["children"]);
  const twoOrMore = Array.isArray(local.children);

  return (
    <button
      {...others}
      class={clsx(buttonBaseClass, twoOrMore && buttonFlexClass)}
    >
      {local.children}
    </button>
  );
}
