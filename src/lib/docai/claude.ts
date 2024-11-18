"use server";

import { env } from "@/env";
import { type RawDocument } from "./resource";
import { initializeGoogleAuth } from "./utils";

export const processDocument = async (rawDocument: RawDocument) => {
  try {
    const { docaiClient } = await initializeGoogleAuth();
    if (!docaiClient) return;

    return await docaiClient.projects.locations.processors
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
      );
  } catch (err: unknown) {
    console.table(err);
  }
};
