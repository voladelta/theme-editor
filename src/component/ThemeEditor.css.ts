import { style } from "@vanilla-extract/css";

export const classThemeEditor = style({
  width: "420px",
  padding: "0.5rem",
});

export const classColorRow = style({
  display: "flex",
  cursor: "pointer",
  alignItems: "center",
  textTransform: "capitalize",
});

export const classColorBox = style({
  width: "1.5rem",
  height: "1.5rem",
  marginRight: "0.25rem",
});

export const classColorPicker = style({
  display: "flex",
});
