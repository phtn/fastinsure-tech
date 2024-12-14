import { env } from "@/env";
import { GoogleAuth, type JWT } from "google-auth-library";
import { documentai_v1 } from "googleapis";

let authClient: JWT | null = null;
let docaiClient: documentai_v1.Documentai | null = null;

const getAuthClient = async () => {
  if (authClient) return authClient;
  const scopes: string[] = ["https://www.googleapis.com/auth/cloud-platform"];
  const credentials = JSON.parse(env.ADC) as object;
  const auth = new GoogleAuth({
    credentials,
    scopes,
  });
  return (await auth.getClient()) as JWT;
};

export const initializeGoogleAuth = async () => {
  if (authClient && docaiClient) {
    return { authClient, docaiClient };
  }

  try {
    authClient = await getAuthClient();

    docaiClient = new documentai_v1.Documentai({
      auth: authClient,
    });

    return { authClient, docaiClient };
  } catch (error) {
    console.error("Error initializing Google Auth:", error);
    throw new Error("Failed to initialize Google Auth");
  }
};
