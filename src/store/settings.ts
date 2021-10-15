import { DefaultThemes, Theme } from "~/lib/theming";
import { storeGet, storeSet } from "~/lib/storage";
import { on } from "solid-js";
import { produce, SetStoreFunction, Store } from "solid-js/store";
import { createEffectDebug, makeStore, serialize } from "~/lib/fn";

type LayoutSetting = {
  selectedId: string;
  selectedIndexId: string;
  interval: string;
  updatingPeriod: string;
  exchange: string;
};

const [Layout, setLayout] = makeStore<LayoutSetting>({
  selectedId: "",
  selectedIndexId: "",
  interval: "15m",
  updatingPeriod: "15m",
  exchange: "ftx",
});

type SettingTheming = {
  selectedTheme: string;
  themeList: Theme[];
};

const [Theming, setTheming] = makeStore<SettingTheming>({
  selectedTheme: "BetaPlay",
  themeList: [] as Theme[]
});

export { Layout, Theming };

export async function loadSettings() {
  const layout = await storeGet("bp-app.settings.layout");
  if (layout) {
    setLayout(layout);
  }

  const theming = await storeGet("bp-app.settings.theming");
  if (theming) {
    setTheming(theming);
  }
}

export function selectedLayout(id: string) {
  setLayout({ "selectedId": id, lastUpdated: Date.now() });
}

export function watchAndSave() {
  createEffect(on(() => Layout.lastUpdated, () => {
    storeSet("bp-app.settings.layout", serialize(Layout));
  }, { defer: true }));

  createEffectDebug(on(() => Theming.lastUpdated, () => {
    console.trace('theming')
    storeSet("bp-app.settings.theming", serialize(Theming));
  }, { defer: true }), "saveTheme");
}

export function selectTheme(name: string) {
  if (name === "Create My Theme") {
    return upsertTheme({
      name: "My Slick Theme " + Theming.themeList.length,
      type: "custom",
      palette: { ...DefaultThemes[0].palette },
    })
  }

  setTheming("selectedTheme", name);
}

export function upsertTheme(theme: Theme, oldName?: string) {
  setTheming(produce((draft: SettingTheming) => {
    if (oldName) {
      const oldTheme = draft.themeList.find((it: Theme) =>
        it.name === oldName
      )!;
      oldTheme.name = theme.name;
      oldTheme.palette = theme.palette;
    } else {
      draft.themeList.push(theme);
    }

    draft.selectedTheme = theme.name;
  }));
}
