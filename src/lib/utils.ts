/**
 * Creates a debounced function delays invoking `fn` until after `ms` have elapsed.
 */
export const debounce = (fn: Function, ms: number) => {
  let timeoutId: number;
  return function (...args: any[]) {
    clearTimeout(timeoutId);
    // @ts-ignore
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

/**
 * Sleep for ms interval
 */
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function padToStr(str: string, pad: string, padLeft = false) {
  return padLeft
    ? (pad + str).slice(-pad.length)
    : (str + pad).substring(0, pad.length);
}

/**
 * Format number into $ currency as xxx,xxx.xx
 */
export function formatNumber(value: number) {
  return value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function assert(assertion: boolean, message: string) {
  if (!assertion) throw new Error(`DEV: ${message}`)
}