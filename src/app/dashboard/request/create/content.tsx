"use client";
import { RequestContext } from "./ctx";
import { CreateNew } from "./forms/create-new";
export const Content = () => (
  <RequestContext>
    <CreateNew />
  </RequestContext>
);
