import { del, get, set, update } from "idb-keyval";

const NS = "BetaPlay-";

export const storeGet = (key: string) => get(NS + key);

export const storeDel = (key: string) => del(NS + key);

export const storeSet = (key: string, value: any) => set(NS + key, value);

export const storeUpdate = (key: string, updater: (oldValue: any) => any) =>
  update(NS + key, updater);
