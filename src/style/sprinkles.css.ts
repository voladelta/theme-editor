import {
  defineProperties,
  createSprinkles
} from '@vanilla-extract/sprinkles';
import { vars} from './vars.css'

const responsiveProperties = defineProperties({
  properties: {
    display: ['none', 'flex'],
    flexDirection: ['row', 'column'],
    alignItems: ['stretch', 'flex-start', 'center', 'flex-end'],
    justifyContent: ['stretch', 'flex-start', 'center', 'flex-end'],
    gap: vars.spacing,
    paddingTop: vars.spacing,
    paddingBottom: vars.spacing,
    paddingLeft: vars.spacing,
    paddingRight: vars.spacing,
    marginTop: vars.spacing,
    marginBottom: vars.spacing,
    marginLeft: vars.spacing,
    marginRight: vars.spacing,
    width: vars.sizes,
    height: vars.sizes,
    borderRadius: vars.radii,
    fontFamily: vars.fonts,
    fontSize: vars.fontSizes,
    fontWeight: vars.fontWeights,
    lineHeight: vars.lineHeights,
    textAlign: ['left', 'center', 'right'],
  },
  shorthands: {
    m: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    mx: ['marginLeft', 'marginRight'],
    my: ['marginTop', 'marginBottom'],
    p: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    px: ['paddingLeft', 'paddingRight'],
    py: ['paddingTop', 'paddingBottom'],
    placeItems: ['alignItems', 'justifyContent'],
    typeSize: ['fontSize', 'lineHeight'],
  },
});

const colorProperties = defineProperties({
  properties: {
    color: vars.colors,
    background: vars.colors
  }
});

export const sprinkles = createSprinkles(
  responsiveProperties,
  colorProperties
);
