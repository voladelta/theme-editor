import { style } from "@vanilla-extract/css";
import { classCardBase } from "./Card.css";

export const classDropdownContent = style([classCardBase, {
  padding: "0.5rem",
  maxHeight: '100%',
  overflowY: "auto",
  boxShadow:
    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
}]);
