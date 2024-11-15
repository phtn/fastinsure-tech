import {
  render,
  queries,
  within,
  type RenderOptions,
} from "@testing-library/react";
import { type ReactElement } from "react";

import {
  queryHelpers,
  buildQueries,
  type Matcher,
  type MatcherOptions,
} from "@testing-library/react";

/**
 * @jest-environment jsdom
 */

// The queryAllByAttribute is a shortcut for attribute-based matchers
// You can also use document.querySelector or a combination of existing
// testing library utilities to find matching nodes for your query
//
const queryAllByDataCy = (
  container: HTMLElement,
  id: Matcher,
  options?: MatcherOptions,
) => queryHelpers.queryAllByAttribute("data-cy", container, id, options);

const getMultipleError = (c: Element | null, dataCyValue: string) =>
  `Found multiple elements with the data-cy attribute of: ${dataCyValue}`;
const getMissingError = (c: Element | null, dataCyValue: string) =>
  `Unable to find an element with the data-cy attribute of: ${dataCyValue}`;

const [
  queryByDataCy,
  getAllByDataCy,
  getByDataCy,
  findAllByDataCy,
  findByDataCy,
] = buildQueries(queryAllByDataCy, getMultipleError, getMissingError);

const customQueries = {
  queryByDataCy,
  queryAllByDataCy,
  getByDataCy,
  getAllByDataCy,
  findAllByDataCy,
  findByDataCy,
};

const allQueries = {
  ...queries,
  ...customQueries,
};

const customScreen = within(document.body, allQueries);
const customWithin = (element: HTMLElement) => within(element, allQueries);
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">,
) => render(ui, { queries: allQueries, ...options });

export * from "@testing-library/react";
export {
  customScreen as screen,
  customWithin as within,
  customRender as render,
};
