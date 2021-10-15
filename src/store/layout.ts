import { nanoid } from "nanoid";
import { storeGet, storeSet } from "../lib/storage";
import { layout, SelectedLayoutId, setSelectedLayout } from "./Settings.store";
import type { IndexWeight } from "../lib/Indexman";
import { WritableDraft } from "immer/dist/internal";
import assert from "assert";
import { Layout, selectedLayout } from "./settings";
import { immer, sample } from "~/lib/fn";

export type Symbol = {
  name: string;
  weights?: IndexWeight[];
  visible: boolean;
};

export type Layout = {
  id: string;
  name: string;
  interval: string;
  symbols: Symbol[];
  isPinned: boolean;
  lastUpdated: number;
};

const UntitledLayout = {
  id: "",
  name: "Untitled",
  symbols: [],
  interval: "15m",
  isPinned: false,
  lastUpdated: 0,
};

const [Layouts, setLayouts] = createSignal<Layout[]>([]);

const setState = (fn: (draft: WritableDraft<Layout[]>) => void) =>
  setLayouts(state => produce(state, draft => void fn(draft)))

const assertID = (id: string | undefined) => assert(
  Layouts().some((it) => it.id === id),
  `Layout ${id} should exist`
)

function removeLayout(id: string) {
  assertID(id)

  setState(draft => {
    draft.filter((it) => it.id !== id)
  })

  if (Layout().selectedId === id) {
    SelectedLayout(Layouts()[0]?.id)
  }


  if (Layouts().length < 0) {
    insertLayout(
      makeSampleLayout()
    )
  }
}

function cloneLayout(id: string) {
  assertID(id)

  setState(draft => {
    const cloning = draft.find((it) => it.id === id);

    draft.push({
      ...cloning!,
      id: nanoid(),
      name: cloning!.name + " The Clone",
      lastUpdated: Date.now(),
    });
  })
}

function updateLayout(layout: Partial<Layout>) {
  assertID(layout?.id)

  setState(draft => {
    const { id, ...changes } = layout;
    const i = draft.findIndex((it) => it.id === id);
    draft[i] = {
      ...draft[i],
      ...changes,
      lastUpdated: Date.now(),
    };
  })
}

function insertLayout(layout: Partial<Layout>) {
  const newLayout = {
    ...UntitledLayout,
    ...layout,
    id: nanoid(),
    lastUpdated: Date.now(),
  }
  setState((draft) => {
    draft.push(newLayout);
  })
  selectedLayout(newLayout.id)
}

export async function loadLayouts() {
  let data = (await storeGet("layouts")) ?? [];
  if (!data.length) {
    // create sample layout for users to play
    data = [makeSampleLayout()];
    storeSet("layouts", data);

    setTimeout(() => {
      // pre-select new layout for user
      setSelectedLayout(data[0].id)
    }, 500)
  }

  setLayouts(data);

  createEffect(() => {
    storeSet("layouts", Layouts())
  })

  return data.length;
}

const [SelectedLayout, updateSelectedLayout] = sample<Layout>(() =>
  Layouts().find((it) => it.id === SelectedLayoutId())!
)


const setLayoutState = (fn: (draft: WritableDraft<Layout>) => void) =>
  updateSelectedLayout(state => produce(state, draft => void fn(draft)))

function intervalUpdate(interval:string) {
  setLayoutState(draft => {
    draft?.interval = interval
  })
}

export const intervalUpdate = createEvent<string>();
export const marketAdd = createEvent<Symbol | Symbol[]>();
export const marketRemove = createEvent<string>();
export const marketToggle = createEvent<string>();
export const marketClear = createEvent();

SelectedLayout.on(
  intervalUpdate,
  (layout, interval) =>
    produce(layout, (draft) => void (draft.interval = interval)),
).on(marketAdd, (layout, market) =>
  produce(layout, (draft) => {
    const markets = Array.isArray(market) ? market : [market];

    const newOnly = markets.filter((m) =>
      !draft.symbols.some((sm) => sm.name === m.name)
    );
    draft.symbols = [
      ...draft.symbols,
      ...newOnly,
    ];
  })).on(marketRemove, (layout, symbol) =>
    produce(layout, (draft) => {
      draft.symbols = draft.symbols.filter((m) => m.name !== symbol);
    })).on(marketToggle, (layout, symbol) =>
      produce(layout, (draft) => {
        const market = draft.symbols.find((m) => m.name === symbol);
        market.visible = !market.visible;
      })).on(
        marketClear,
        (layout) => produce(layout, (draft) => void (draft.symbols = [])),
      );

SelectedLayout.updates.watch((layout) => updateLayout(layout));

export const LayoutRenaming = createStore({
  id: "",
  oldName: "",
});

export const setLayoutRenaming = createEvent<{ id: string; oldName: string }>();

forward({
  from: setLayoutRenaming,
  to: LayoutRenaming,
});

export function makeSampleLayout(): Layout {
  const symbols = ["BTC-PERP", "ETH-PERP", "FTT-PERP", "SOL-PERP", "BNB-PERP"]
    .map((name) => ({
      name,
      visible: true,
    }));

  return {
    ...UntitledLayout,
    symbols,
    id: nanoid(),
    name: "UpOnly Sample",
    lastUpdated: Date.now(),
  };
}
