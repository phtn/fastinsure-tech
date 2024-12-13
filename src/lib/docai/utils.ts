"use server";

import { googleAuthClient } from "@/app/actions";
import type { JWT } from "google-auth-library";
import { documentai_v1 } from "googleapis";

let authClient: JWT | null = null;
let docaiClient: documentai_v1.Documentai | null = null;

export const initializeGoogleAuth = async () => {
  if (authClient && docaiClient) {
    return { authClient, docaiClient };
  }

  try {
    authClient = (await googleAuthClient()) as JWT;

    docaiClient = new documentai_v1.Documentai({
      auth: authClient,
    });

    return { authClient, docaiClient };
  } catch (error) {
    console.error("Error initializing Google Auth:", error);
    throw new Error("Failed to initialize Google Auth");
  }
};
