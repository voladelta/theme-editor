import { style } from '@vanilla-extract/css';

export const classStack = style({
  display: "grid",
  gap: "var(--bp-stack-spacing)",
})

export const classHStack = style({
  gridAutoRows: 'auto'
})

export const classVStack = style({
  gridAutoColumns: 'auto'
})
