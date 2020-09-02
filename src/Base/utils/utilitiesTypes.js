// @flow

// flowlint-next-line unclear-type: off
export type ExtractReturn<F> = $Call<<T>((...args: Array<any>) => T) => T, F>;
