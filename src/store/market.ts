import { createMutable } from "solid-js/store";
import { Trade } from "~/api/ftx";

export type MarketStore = {
  tradeHistory: Record<string, Trade[]>
}

export const marketStore = createMutable<MarketStore>({
  tradeHistory: {}
})

export function updateTrades(market: string, trades: Trade[]) {
  marketStore.tradeHistory[market] = trades
}
