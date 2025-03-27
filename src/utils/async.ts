/**
 *  async/await inferred params wrapper
 *
 */
export const asyncFn =
  <TParams, TReturn>(fn: (params: TParams) => Promise<TReturn>) =>
  async (params: TParams) =>
    await fn(params);
