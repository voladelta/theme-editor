import { style } from '@vanilla-extract/css';

export const buttonBaseClass = style({
  height: '2rem',
  padding: '0.5rem',
  lineHeight: 1,
  borderRadius: '0.125rem',
  border: '1px solid var(--bp-theme-button-shade)',
  cursor: 'pointer',
  ':focus': {
    outline: 'none'
  },
  ':hover': {
    background: 'var(--bp-theme-button)'
  }
})

export const buttonFlexClass = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})
