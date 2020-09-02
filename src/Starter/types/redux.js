// @flow

export type Action<T, P = void, M = void> = { type: T, payload?: P | void, meta?: M };
