import { style } from '@vanilla-extract/css';

const baseClass = style({
  position: 'absolute',
  left: 0,
  top: 0,
  opacity: 0,
  height: '100%',
  width: 0,
  overflow: 'hidden',
  transitionDuration: '0.4s',
  transitionTimingFunction: 'cubic-bezier(0.45, 0, 0.55, 1)',
  transformOrigin: 0
})

export const drawerContent = style([baseClass, {
  zIndex: 100,
  transform: 'scaleX(0)',
  transitionProperty: 'opacity, transform',
}]);

export const drawerMask = style([baseClass, {
  zIndex: 99,
  width: '100%',
  transform: 'scaleX(0)',
  background: 'var(--bp-theme-card)',
  transitionProperty: 'opacity, transform',
}]);

export const drawerHidden =  { opacity: 0, transform: 'scaleX(0)' }
export const drawerContentShowing =  { opacity: 0.95, transform: 'scaleX(100%)' }
export const drawerMaskShowing =  { opacity: 0.5, transform: 'scaleX(100%)' }
