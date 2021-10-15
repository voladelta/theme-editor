import { style } from "@vanilla-extract/css";

export const classDialog = style({
  position: "absolute",
  left: 0,
  top: 0,
  display: "none",
  zIndex: 50,
  width: "var(--modal-width, 280px)",
  minWidth: 'fit-content',
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
});

export const classDialogVisible = style({
  display: "block",
});

export const classDialogTitle = style({
  display: "inline-flex",
  alignItems: "center",
  cursor: "move",
  userSelect: "none",
});

export const classDialogResizer = style({
  position: "absolute",
  bottom: 0,
  right: 0,
  color: "var(--bp-theme-button)",
  cursor: "nwse-resize",
});
