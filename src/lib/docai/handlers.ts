"use server";

import { google } from "googleapis";
import { type JWT } from "google-auth-library";
import { env } from "@/env";
import { type RawDocument } from "@/lib/docai/resource";

const getAuthClient = (): Promise<JWT | Error> => {
  const serviceAccount = JSON.parse(env.ADC) as object;
  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });
  return auth.getClient() as Promise<JWT>;
};

export const processDocument = async (rawDocument: RawDocument) => {
  const client = (await getAuthClient()) as JWT;

  if (!client) return;

  const documentai = google.documentai({
    version: "v1",
    auth: client,
  });

  return await documentai.projects.locations.processors
    .process({
      name: `projects/${env.PROJECT_ID}/locations/${env.PROCESSOR_LOC}/processors/${env.CR_PROCESSOR}`,
      requestBody: {
        rawDocument,
      },
    })
    .then((response) =>
      response.data.document?.entities?.map(
        ({ type, mentionText, confidence }) => ({
          type,
          mentionText,
          confidence,
        }),
      ),
    )
    .catch((err: Error) => {
      console.table({
        name: err.name,
        message: err.message,
        cause: err.cause,
        stack: err.stack,
      });
    });
};
