import { Draft, WritableDraft } from "immer/dist/internal";
import type { Accessor, Setter } from "solid-js";
import { createResource, DEV, getOwner } from "solid-js";
import { SetStoreFunction, Store } from "solid-js/store";

export function sampleV1<T>(fn: () => T): [Accessor<T>, Setter<T>] {
  const [value, setValue] = createSignal<T>(fn());

  createComputed(() => {
    // @ts-ignore
    setValue(fn());
  });

  Object.defineProperty(value, "set", {
    // @ts-ignore
    value: (v: T) => setValue(v),
  });

  return [value, setValue];
}

export function sample<T>(fn: () => T): [Accessor<T>, Setter<T>] {
  const [value, { mutate: setValue }] = createResource(fn, (it) => it);

  return [value as Accessor<T>, setValue as Setter<T>];
}

export function guard(fn: () => boolean) {
  return !untrack<boolean>(fn);
}

export function select<T>(
  state: Store<T>,
  key: keyof T,
): Accessor<Store<T>[keyof T]> {
  return createMemo(() => state[key]);
}

export const read = untrack;

export function useToggle(value: boolean): [Accessor<boolean>, () => void] {
  const [signal, setSignal] = createSignal(value);

  return [signal, () => setSignal((it) => !it)];
}

/**
 * Create store with `lastUpdated` so which is updated every changes.
 * So we can listen to it whenever store changes.
 */
export function makeStore<T>(
  state: T,
): [Store<T & { lastUpdated: number }>, SetStoreFunction<T>] {
  const [store, setStore] = createStore<T & { lastUpdated: number }>({
    ...state,
    lastUpdated: Date.now(),
  });

  const handler = {
    //@ts-ignore
    apply: function (target: any, _thisArg: any, argumentsList: any) {
      batch(() => {
        target(...argumentsList);
        target("lastUpdated", Date.now());
      });
    },
  };

  const setter = new Proxy<SetStoreFunction<T>>(setStore, handler);

  return [store, setter];
}

export const serialize = <T>(state: Store<T>): T =>
  JSON.parse(JSON.stringify(state));

export function devGraph() {
  let owner = getOwner();

  window._$afterUpdate = () => {
    console.log(JSON.stringify(
      DEV.serializeGraph(owner),
      null,
      2,
    ));
  };
}

let flow: string[] = [];
let scope = "";

//@ts-ignore
window.setStartFlow = (name: string) => {
  scope = name;
  flow = [];
};

//@ts-ignore
window.getFlow = () => {
  console.log({ flow });
};

export function createEffectDebug(fn: Function, name: string = "") {
  createEffect(() => {
    if (name && scope) {
      if (name === scope) flow = [name];
      else flow.push(name);
    }

    fn();
  });
}
