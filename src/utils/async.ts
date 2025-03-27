import type { Dispatch, SetStateAction } from "react";

/**
 *  async/await inferred params wrapper
 *
 */

export const asyncFn =
   <TParams, TReturn>(fn: (params: TParams) => Promise<TReturn>) =>
   async (params: TParams) =>
     await fn(params);

export const asyncFnCb =
  <TParams, TReturn>(fn: (params: TParams) => Promise<TReturn | null>, cb?: (set: Dispatch<SetStateAction<boolean>>) => null) =>
  async (params: TParams, set: Dispatch<SetStateAction<boolean>>) =>
    await fn(params).then(cb ? cb(set) : null);
