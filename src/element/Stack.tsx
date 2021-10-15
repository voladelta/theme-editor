import clsx from "clsx";
import { JSX, JSXElement } from "solid-js";
import { classHStack, classStack, classVStack } from "./Stack.css";

type StackProps = {
  isInline?: boolean;
  spacing?: number;
  style?: JSX.CSSProperties;
  children: JSXElement;
} & Record<string, any>;
export default function Stack(
  { isInline = false, spacing = 1, children, style, ...others }: StackProps,
) {
  const customStyle = {
    ...style,
    "--bp-stack-spacing": spacing + "rem",
  };

  return (
    <div
      class={clsx(classStack, isInline ? classHStack : classVStack)}
      {...others}
      style={customStyle}
    >
      {children}
    </div>
  );
}
