// import {
//   Dispatch,
//   SetStateAction,
//   TransitionStartFunction,
//   useCallback,
//   useTransition,
// } from "react";
// import initAdmin from "./admin";

// export const useAdmin = () => {
//   const [pending, transition] = useTransition();

//   const startFn = <T>(
//     transition: TransitionStartFunction,
//     fn: () => Promise<T>,
//     set: Dispatch<SetStateAction<T>>,
//   ) => {
//     transition(() => {
//       transition(async () => {
//         const result = await fn();
//         set(result);
//       });
//     });
//   };
// };
