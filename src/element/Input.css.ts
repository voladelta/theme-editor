import { style } from '@vanilla-extract/css';

export const classInputBase = style({
  width: '100%',
  padding: '0.25rem 0.5rem',
  borderRadius: '0.125rem',
  background: 'rgba(255, 255, 255, 0.15)',
  ':focus': {
    outline: 'none'
  }
})
