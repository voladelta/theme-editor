import chroma from "chroma-js";

export type Palette = Record<string, string>;

export type Theme = {
  name: string;
  type: "premade" | "custom";
  palette: Palette;
};

export const DefaultThemes: Theme[] = [{
  name: "BetaPlay",
  type: "premade",
  palette: {
    background: "#134e4a",
    card: "#134e4a",
    text: "#ccfbf1",
    button: "#14b8a6",
    alert: "#0ea5e9",
    up: "#86efac",
    down: "#fca5a5",
  },
}, {
  name: "Ayu",
  type: "premade",
  palette: {
    background: "#0f172a",
    card: "#3a414ddb",
    text: "#cccac2",
    button: "#a17112",
    alert: "#0ea5e9",
    up: "#87d96c",
    down: "#f27983",
  },
}, {
  name: "KING Fisher",
  type: "premade",
  palette: {
    background: "#171b29",
    card: "#29314af0",
    text: "#ffffff",
    button: "#649d66",
    alert: "#246db6cc",
    up: "#61a066",
    down: "#ec4251",
  },
}];

export function themeColorSet(
  style: CSSStyleDeclaration,
  name: string,
  color: string,
) {
  if (name === "card") {
    // find border and gradient colors
    const coloma = chroma(color);
    const lum = coloma.luminance();
    let colors;
    if (lum > 0.5) {
      // light
      colors = chroma.scale([
        coloma.hex(),
        coloma.darken(0.5).hex(),
      ]).mode("lch").colors(3);
    } else {
      // dark
      colors = chroma.scale([
        coloma.brighten(0.5).hex(),
        coloma.hex(),
      ]).mode("lch").colors(3);

      colors.reverse();
    }

    style.setProperty(`--bp-theme-card-gr1`, colors[0]);
    style.setProperty(`--bp-theme-card-gr2`, colors[1]);
    style.setProperty(`--bp-theme-card-border`, colors[2]);
  }

  style.setProperty(`--bp-theme-${name}`, color);
}

export function paletteLoad(palette: Palette) {
  const appStyle = (document.querySelector(".bp-app") as HTMLElement)?.style;
  if (!appStyle) return;

  Object.keys(palette).forEach((name) => {
    themeColorSet(appStyle, name, palette[name]);
  });
}
