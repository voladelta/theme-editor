import { style } from '@vanilla-extract/css';

export const classCardBase = style({
  backdropFilter: 'blur(21px)',
  background: `linear-gradient(
    180deg,
    var(--bp-theme-card-gr1),
    var(--bp-theme-card-gr2)
  )`,
  opacity: '0.96',
  width: 'max-content'
})

export const classCardRounded = style({
  borderRadius: '0.125rem'
})

export const classCardBordered = style({
  border: '1px solod',
  borderColor: 'var(--bp-theme-card-border)'
})
