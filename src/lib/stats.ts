import type { VBar } from "./VolumeBar";

export type PriceSeries = number[];

export type PricePoint = { time: number; close: number };

export type CloseSeries = PricePoint[];

export type Candle = PricePoint & {
  open: number
  high: number
  low: number
  volume: number
}

export type OHLCSeries = Candle[];

export function toHLC3(p: Candle) {
  return (p.close + p.high + p.low) / 3;
}

export function candleToCumLog(series: OHLCSeries, withTime = false) {
  let sum = 0;
  let prev = Math.log(series[0].open);
  return series.map((p) => {
    const curr = Math.log(toHLC3(p));
    sum += curr - prev;
    prev = curr;

    if (withTime) return { time: p.time, close: sum };
    return sum;
  });
}

export function priceToCumLog(series: CloseSeries, withTime = false) {
  let sum = 0;
  let prev = Math.log(series[0].close);
  return series.map((p) => {
    const curr = Math.log(p.close);
    sum += curr - prev;
    prev = curr;

    if (withTime) return { time: p.time, close: sum };
    return sum;
  });
}

export function candleToCumReturn(series: OHLCSeries, withTime = false) {
  let sum = 0;
  let prev = series[0].open;
  return series.map((p) => {
    const curr = toHLC3(p);
    sum += curr / prev - 1;
    prev = curr;

    if (withTime) return { time: p.time, close: sum };
    return sum;
  });
}

export function priceToCumReturn(series: CloseSeries, withTime = false) {
  let sum = 0;
  let prev = series[0].close;
  return series.map((p) => {
    const curr = p.close;
    sum += curr / prev - 1;
    prev = curr;

    if (withTime) return { time: p.time, close: sum };
    return sum;
  });
}

export function priceToLog(series: OHLCSeries, withTime = false) {
  let prev = Math.log(series[0].open);
  return series.map((p) => {
    const curr = Math.log(toHLC3(p));
    const ret = curr - prev;
    prev = curr;

    if (withTime) return { time: p.time, close: ret };
    return ret;
  });
}

export function priceToReturn(series: OHLCSeries, withTime = false) {
  let prev = series[0].open;
  return series.map((p) => {
    const curr = toHLC3(p);
    const ret = curr / prev - 1;
    prev = curr;

    if (withTime) return { time: p.time, close: ret };
    return ret;
  });
}

export function sum(series: PriceSeries) {
  return series.reduce((acc, p) => acc + p, 0);
}

export function mean(series: PriceSeries) {
  return series.reduce((acc, p) => acc + p, 0) / series.length;
}

export function variance(series: PriceSeries) {
  const m = mean(series);
  const v = series.reduce((acc, p) => acc + (p - m) * (p - m), 0);
  return v / (series.length - 1);
}

export function stdev(series: PriceSeries) {
  return Math.sqrt(variance(series));
}

export function covariance(seriesX: PriceSeries, seriesY: PriceSeries) {
  const mx = mean(seriesX);
  const my = mean(seriesY);
  const v = seriesX.reduce(
    (acc, x, i) => acc + (x - mx) * (seriesY[i] - my),
    0,
  );
  return v / (seriesX.length - 1);
}

export function zscores(series: PriceSeries) {
  const m = mean(series);
  const std = stdev(series);
  return series.map((p) => (p - m) / std);
}

export function corr(X:PriceSeries, Y:PriceSeries) {
  const count = X.length;
  let sumX = 0, sumY = 0, sumXY = 0;
  let squareSumX = 0, squareSumY = 0;

  for (let i = 0; i < count; i++) {
    sumX += X[i];
    sumY += Y[i];

    sumXY += X[i] * Y[i];

    squareSumX += X[i] * X[i];
    squareSumY += Y[i] * Y[i];
  }

  return (count * sumXY - sumX * sumY) /
    Math.sqrt(
      (count * squareSumX - sumX * sumX) *
        (count * squareSumY - sumY * sumY),
    );
}

export function beta(series1: PriceSeries, series2: PriceSeries) {
  return covariance(series1, series2) / variance(series2);
}

export function findMinMax(series: PriceSeries) {
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;

  series.forEach((p) => {
    if (p < min) min = p;
    else if (p > max) max = p;
  });

  return [min, max];
}

export function findGroupMinMax(groupSeries: PriceSeries[]) {
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;

  groupSeries[0].forEach((_, i) => {
    groupSeries.forEach((series) => {
      if (series[i] < min) min = series[i];
      else if (series[i] > max) max = series[i];
    });
  });

  return [min, max];
}

export function findBarMinMax(series: VBar[]) {
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;

  series.forEach((p) => {
    if (p.l < min) min = p.l;
    if (p.h > max) max = p.h;
  });

  return [min, max];
}
