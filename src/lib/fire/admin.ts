import { env } from "@/env";
import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

let app: admin.app.App | null = null;

const initAdmin = () => {
  if (app) {
    return app;
  }

  app = admin.initializeApp({
    credential: admin.credential.cert(env.AD),
    databaseURL: "https://fastinsure-f1801.firebaseio.com",
  });

  return app;
};

const init = initAdmin();

export const adminAuth = getAuth(init);
