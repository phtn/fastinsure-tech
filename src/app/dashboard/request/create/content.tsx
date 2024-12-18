"use client";
import { CreateRequestContext } from "./ctx";
import { CreateNew } from "./forms/create-new";
export const Content = () => (
  <CreateRequestContext>
    <CreateNew />
  </CreateRequestContext>
);
