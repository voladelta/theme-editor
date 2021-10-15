import { style } from '@vanilla-extract/css';

export const listItemClass = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline'
})

export const itemDisabledClass = style({
  cursor: 'not-allowed',
  opacity: '0.5'
})
