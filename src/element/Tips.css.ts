import { style } from "@vanilla-extract/css";
import { classCardBase } from "./Card.css";

export const classTipsTrigger = style({
  display: "flex",
  alignItems: "center",
  padding: "0.125rem 0.25rem",
  cursor: "pointer",
  border: "1px solid var(--bp-theme-alert)",
  borderRadius: "0.125rem",
  ":hover": {
    background: "var(--bp-theme-alert)",
  },
});

export const classTipsContent = style([classCardBase, {
  padding: "0.5rem",
  boxShadow:
    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
}]);
