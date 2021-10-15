import { style } from "@vanilla-extract/css";

export const classSelectContainer = style({
  width: "100%",
  padding: "0.25rem 0.5rem",
  borderRadius: "0.125rem",
  background: "rgba(255, 255, 255, 0.15)",
});

export const classSelectElement = style({
  width: "100%",
  minWidth: "100px",
  background: "none",
  color: "var(--bp-theme-text)",
  ":focus": {
    outline: "none",
  },
});
