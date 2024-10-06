import { env } from "@/env";

export interface ResponseSuccess {
  status: string;
  value: object[];
}
export interface ResponseError {
  status: string;
  errorMessage: string;
  errorData: object;
}
export type ConvResponse = ResponseSuccess | ResponseError;

const baseUrl = `${env.NEXT_PUBLIC_CONVEX_URL}/api/run/`;

export const api = (endpoint: string, req?: object) => ({
  run: async () =>
    await fetch(baseUrl + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req ?? { args: {}, format: "json" }),
    }).then(async (response) => {
      return (await response.json()) as ResponseSuccess | ResponseError;
    }),
});
