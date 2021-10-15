import { style } from "@vanilla-extract/css";

export const classRadioGroup = style({
  display: 'inline-flex',
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '0.125rem'
})

export const classRadio = style({
  width: 'min-content',
  height: '2rem',
  textAlign: 'center',
  padding: '0.125rem 0.25rem',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: 'var(--bp-theme-button)'
  },
  ":last-child": {
    borderTopRightRadius: '0.125rem',
borderBottomRightRadius: '0.125rem'
  },
  ":first-child": {
    borderTopLeftRadius: '0.125rem',
    borderBottomLeftRadius: '0.125rem'
  }
})

export const classRadioSelected = style({
  backgroundColor: 'var(--bp-theme-button-shade)'
})
