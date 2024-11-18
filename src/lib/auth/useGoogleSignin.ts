// "use client";

// import type {
//   AuthError,
//   CustomParameters,
//   OAuthCredential,
//   UserCredential,
// } from "firebase/auth";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { useCallback, useState } from "react";
// import { auth } from ".";

// export type AuthActionHook<M> = [
//   M,
//   UserCredential | undefined,
//   boolean,
//   OAuthCredential | null | undefined,
//   AuthError | undefined,
// ];
// export type SignInWithPopupHook = AuthActionHook<
//   (
//     scopes?: string[],
//     customOAuthParameters?: CustomParameters,
//   ) => Promise<UserCredential | null | undefined>
// >;

// export const useGoogleSignin = (): SignInWithPopupHook => {
//   const [error, setError] = useState<AuthError>();
//   const [user, setUser] = useState<UserCredential | undefined>();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [oauth, setOAuth] = useState<OAuthCredential | null>();

//   const signIn = useCallback(async () => {
//     const provider = new GoogleAuthProvider();
//     setLoading(true);
//     setError(undefined);
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const oauth = GoogleAuthProvider.credentialFromResult(result);
//       setUser(result);
//       setOAuth(oauth);

//       return result;
//     } catch (err) {
//       setError(err as AuthError);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   return [signIn, user, loading, oauth, error];
// };
