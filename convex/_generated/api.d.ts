/* prettier-ignore-start */

/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as autos_create from "../autos/create.js";
import type * as autos_d from "../autos/d.js";
import type * as autos_get from "../autos/get.js";
import type * as contact_create from "../contact/create.js";
import type * as contact_d from "../contact/d.js";
import type * as contact_get from "../contact/get.js";
import type * as requests_create from "../requests/create.js";
import type * as requests_d from "../requests/d.js";
import type * as requests_get from "../requests/get.js";
import type * as requests_storage from "../requests/storage.js";
import type * as users_create from "../users/create.js";
import type * as users_d from "../users/d.js";
import type * as users_get from "../users/get.js";
import type * as users_update from "../users/update.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "autos/create": typeof autos_create;
  "autos/d": typeof autos_d;
  "autos/get": typeof autos_get;
  "contact/create": typeof contact_create;
  "contact/d": typeof contact_d;
  "contact/get": typeof contact_get;
  "requests/create": typeof requests_create;
  "requests/d": typeof requests_d;
  "requests/get": typeof requests_get;
  "requests/storage": typeof requests_storage;
  "users/create": typeof users_create;
  "users/d": typeof users_d;
  "users/get": typeof users_get;
  "users/update": typeof users_update;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

/* prettier-ignore-end */
