"use server";

import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { HCodeParams, HCodeResponse } from "../resource";
// import { getConfig } from "./utils";
// const exconfig = {
//   method: "get",
//   url: "/geocode/reverse?",
//   headers: {},
//   baseUrl: "https://api.geoapify.com/v1",
// };

// const params = {
//   lat: "51.21709661403662",
//   lon: "6.7782883744862374",
//   apiKey: "da23de61c8c64826ad3445071373d6cb",
// };
//
//

export const rgc = async (
  data: HCodeParams,
  ax: AxiosInstance,
  config?: AxiosRequestConfig,
) => {
  // const config = await getConfig();
  const response = await ax.post<HCodeResponse | null>(
    "/verify-agent-code",
    data,
    config,
  );
  return response.data;
};
