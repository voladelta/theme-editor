import clsx from "clsx";
import { JSXElement } from "solid-js";
import { classCardBase, classCardBordered, classCardRounded } from "./Card.css";

type CardProps = {
  isRounded?: boolean;
  hasBorder?: boolean;
  children: JSXElement;
};
export default function Card({ hasBorder, isRounded, children }: CardProps) {
  return (
    <div
      class={clsx(
        classCardBase,
        hasBorder && classCardBordered,
        isRounded && classCardRounded,
      )}
    >
      {children}
    </div>
  );
}
