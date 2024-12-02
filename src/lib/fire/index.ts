import { env } from "@/env";
import { initializeApp as init } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: env.NEXT_PUBLIC_F_API_KEY,
  authDomain: env.NEXT_PUBLIC_F_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_F_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_F_STORAGE,
  messagingSenderId: env.NEXT_PUBLIC_F_MESSAGING,
  appId: env.NEXT_PUBLIC_F_APP_ID,
  measurementId: env.NEXT_PUBLIC_F_LENGTH,
};

const app = init(config);
export const auth = getAuth(app);
export const db = getFirestore(app);
