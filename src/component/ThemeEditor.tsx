import {
  DefaultThemes,
  Palette,
  paletteLoad,
  Theme,
  themeColorSet,
} from "~/lib/theming";
import Select from "~/element/Select";
import Input from "~/element/Input";
import iro from "@jaames/iro";
import chroma from "chroma-js";
import Button from "~/element/Button";
import Stack from "~/element/Stack";
import {
  classColorBox,
  classColorPicker,
  classColorRow,
  classThemeEditor,
} from "./ThemeEditor.css";
import { selectTheme, Theming, upsertTheme } from "~/store/settings";
import { shallowEqual } from "fast-equals";
import { createEffectDebug, guard, read, sample, select } from "~/lib/fn";
import Card from "~/element/Card";
import { Accessor, on } from "solid-js";

function pickTheme(themeList: Theme[], name: string): Theme {
  const theme = themeList.find((t) => t.name === name);
  if (theme) return theme;
  // user selects Create My Theme
  return {
    name: "My Slick Theme " + themeList.length,
    type: "custom",
    palette: { ...DefaultThemes[0].palette },
  };
}

function getThemeName(theme: Theme) {
  return theme.type === "premade" ? theme.name + " Copy" : theme.name;
}

export default function ThemeEditor() {
  let colorPickerParent: HTMLDivElement;
  let colorPicker: iro.ColorPicker;
  let rootStyle: CSSStyleDeclaration;

  const themeList = createMemo(() => [...Theming.themeList, ...DefaultThemes]);
  const selectedThemeName = createMemo(() => Theming.selectedTheme);
  const selectedTheme = createMemo(() =>
    pickTheme(themeList(), Theming.selectedTheme)
  );

  const [colorState, setColorState] = createStore({
    themeVar: "background",
    palette: { ...selectedTheme().palette },
    get color(): string {
      return this.palette[this.themeVar];
    },
  });

  const [themeName, setThemeName] = createSignal<string>("");
  const themeNameOptions = createMemo(
    () =>
      [...themeList().map((t) => t.name), "Create My Theme"]
        .map((name) => ({ name, value: name })),
  );

  const buttonName = createMemo(() =>
    selectedTheme().type === "custom" ? "Update" : "Save as"
  );

  createEffectDebug(() => {
    const theme = selectedTheme();

    paletteLoad(theme.palette);
    setColorState("palette", theme.palette);
    setThemeName(getThemeName(theme));
  }, "onThemeChange");

  const setColor = (color: string) =>
    setColorState("palette", { [colorState.themeVar]: color });

    createEffectDebug(() => {
    const themeVarStr = read(() => colorState.themeVar);
    const colorStr = colorState.color;
    if (!chroma.valid(colorStr)) return;

    const colorHex = chroma(colorStr).hex();
    if (colorPicker && colorPicker.color.hex8String !== colorStr) {
      // set color to picker, since it's from input
      colorPicker.color.hex8String = colorHex;
    }

    const skip = guard(() => colorState.palette[themeVarStr] !== colorHex);
    if (skip) return;

    untrack(() => setColor(colorHex));

    rootStyle && themeColorSet(rootStyle, themeVarStr, colorHex);
  }, "onColorChange");

  function changeThemeVar(ev: MouseEvent) {
    const themeVarStr = (ev.currentTarget as HTMLDivElement).dataset.themeVar!;
    setColorState("themeVar", themeVarStr);
  }

  function saveTheme() {
    upsertTheme({
      name: themeName(),
      type: "custom",
      palette: colorState.palette,
    }, buttonName() === "Update" ? selectedTheme().name : "");
  }

  onMount(() => {
    rootStyle = (document.querySelector(".bp-app") as HTMLElement)?.style;

    colorPicker = iro.ColorPicker(colorPickerParent, {
      width: 200,
      color: "#14B8A6",
      layout: [
        {
          component: iro.ui.Box,
        },
        {
          component: iro.ui.Slider,
          options: {
            sliderType: "hue",
          },
        },
        {
          component: iro.ui.Slider,
          options: {
            sliderType: "alpha",
          },
        },
      ],
    });

    colorPicker.on(
      "input:change",
      (color: iro.Color) => setColor(color.hex8String),
    );
  });

  return (
    <Card>
      <div class={classThemeEditor}>
        <Stack>
          <div style="width: 50%">
            <Select
              options={themeNameOptions}
              model={[selectedThemeName, selectTheme]}
            />
          </div>
          <div class={classColorPicker}>
            <Stack>
              <div>Palette</div>
              <Stack spacing={0.5}>
                <For each={Object.keys(colorState.palette)}>
                  {(themeVarStr) => (
                    <div
                      class={classColorRow}
                      data-theme-var={themeVarStr}
                      onClick={changeThemeVar}
                    >
                      <span
                        class={classColorBox}
                        style={`background: ${colorState.palette[themeVarStr]}`}
                      />
                      <span>
                        {themeVarStr}
                      </span>
                    </div>
                  )}
                </For>
              </Stack>
              <div>
                <label style={{ "margin-bottom": "0.25rem" }}>Theme name</label>
                <Input model={[themeName, setThemeName]} />
                <Button style={{ "margin-top": "0.5rem" }} onClick={saveTheme}>
                  {buttonName()}
                </Button>
              </div>
            </Stack>
            <Stack spacing={0.5} style={{ "margin-left": "0.5rem" }}>
              <div>
                <label style="margin-bottom: 0.25rem">
                  Select color for
                  <div
                    style={{
                      display: "inline-block",
                      "margin-left": "0.25rem",
                      "text-transform": "capitalize",
                    }}
                  >
                    {colorState.themeVar}
                  </div>
                </label>
                <Input
                  model={[
                    () => colorState.color,
                    setColor,
                  ]}
                />
              </div>
              <div>
                <div ref={colorPickerParent} />
              </div>
            </Stack>
          </div>
        </Stack>
      </div>
    </Card>
  );
}
