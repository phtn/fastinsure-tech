// import { useState, useEffect, useCallback, useRef } from "react";

// interface UseReconnectionOptions {
//   initialDelay?: number; // Initial delay in ms
//   maxDelay?: number; // Maximum delay in ms
//   maxAttempts?: number; // Maximum number of attempts (0 for infinite)
//   backoffRate?: number; // Rate at which to increase delay
//   onConnect?: () => void; // Callback when connection succeeds
//   onDisconnect?: () => void; // Callback when connection is lost
//   onError?: (error: Error) => void; // Callback for errors
// }

// export function useReconnection(
//   connectionFn: () => Promise<boolean>,
//   options: UseReconnectionOptions = {},
// ) {
//   const {
//     initialDelay = 1000,
//     maxDelay = 30000,
//     maxAttempts = 0,
//     backoffRate = 1.5,
//     onConnect,
//     onDisconnect,
//     onError,
//   } = options;

//   const [isConnected, setIsConnected] = useState(false);
//   const [attemptCount, setAttemptCount] = useState(0);
//   const [error, setError] = useState<Error | null>(null);

//   // Use refs for values that shouldn't trigger re-renders
//   const currentDelay = useRef(initialDelay);
//   const timeoutRef = useRef<NodeJS.Timeout>();
//   const mountedRef = useRef(true);

//   // Reset connection state
//   const reset = useCallback(() => {
//     setAttemptCount(0);
//     currentDelay.current = initialDelay;
//     setError(null);
//   }, [initialDelay]);

//   // Attempt connection
//   const attemptConnection = useCallback(async () => {
//     if (!mountedRef.current) return;

//     try {
//       setAttemptCount((count) => count + 1);
//       const connected = await connectionFn();

//       if (!mountedRef.current) return;

//       if (connected) {
//         setIsConnected(true);
//         setError(null);
//         reset();
//         onConnect?.();
//       } else {
//         throw new Error("Connection failed");
//       }
//     } catch (err) {
//       if (!mountedRef.current) return;

//       const error = err instanceof Error ? err : new Error("Unknown error");
//       setError(error);
//       setIsConnected(false);
//       onError?.(error);

//       // Calculate next delay with exponential backoff
//       currentDelay.current = Math.min(
//         currentDelay.current * backoffRate,
//         maxDelay,
//       );

//       // Schedule next attempt if we haven't exceeded maxAttempts
//       if (maxAttempts === 0 || attemptCount < maxAttempts) {
//         timeoutRef.current = setTimeout(
//           attemptConnection,
//           currentDelay.current,
//         );
//       }
//     }
//   }, [
//     connectionFn,
//     maxDelay,
//     maxAttempts,
//     backoffRate,
//     onConnect,
//     onError,
//     reset,
//     attemptCount,
//   ]);

//   // Start reconnection process
//   const startReconnecting = useCallback(async () => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//     setIsConnected(false);
//     onDisconnect?.();
//     await attemptConnection();
//   }, [attemptConnection, onDisconnect]);

//   // Stop reconnection attempts
//   const stopReconnecting = useCallback(() => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//   }, []);

//   // Cleanup on unmount
//   useEffect(() => {
//     mountedRef.current = true;
//     attemptConnection().catch(console.error);

//     return () => {
//       mountedRef.current = false;
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, [attemptConnection]);

//   return {
//     isConnected,
//     attemptCount,
//     error,
//     startReconnecting,
//     stopReconnecting,
//     reset,
//   };
// }

// export const Reconnect = () => {
//   const {
//     isConnected,
//     attemptCount,
//     error,
//     startReconnecting,
//     stopReconnecting,
//   } = useReconnection(
//     async () => {
//       // Your connection logic here
//       const response = await fetch("https://api.example.com/status");
//       return response.ok;
//     },
//     {
//       initialDelay: 1000,
//       maxDelay: 30000,
//       maxAttempts: 0,
//       backoffRate: 1.5,
//       onConnect: () => console.log("Connected!"),
//       onDisconnect: () => console.log("Disconnected!"),
//       onError: (error) => console.error("Connection error:", error),
//     },
//   );

//   return (
//     // <div>
//     //   <div>Status: {isConnected ? 'Connected' : 'Disconnected'}</div>
//     //   <div>Attempt: {attemptCount}</div>
//     //   {error && <div>Error: {error.message}</div>}
//     //   <button onClick={startReconnecting}>Reconnect</button>
//     <p className="font-jet text-[10px] text-amber-500">{attemptCount}</p>
//     // <button onClick={stopReconnecting}>Stop</button>
//     // </div>
//   );
// };

// // // WebSocket-specific example
// // function WebSocketComponent() {
// //   const [ws, setWs] = useState<WebSocket | null>(null);

// //   const {
// //     isConnected,
// //     attemptCount,
// //     error
// //   } = useReconnection(
// //     async () => {
// //       return new Promise((resolve, reject) => {
// //         const websocket = new WebSocket('wss://example.com');

// //         websocket.onopen = () => {
// //           setWs(websocket);
// //           resolve(true);
// //         };

// //         websocket.onerror = (error) => {
// //           reject(error);
// //         };

// //         // Timeout after 5 seconds
// //         setTimeout(() => reject(new Error('Connection timeout')), 5000);
// //       });
// //     },
// //     {
// //       onConnect: () => console.log('WebSocket connected'),
// //       onDisconnect: () => {
// //         console.log('WebSocket disconnected');
// //         ws?.close();
// //         setWs(null);
// //       }
// //     }
// //   );

// //   return (
// //     <div>
// //       <div>WebSocket Status: {isConnected ? 'Connected' : 'Disconnected'}</div>
// //       <div>Attempt: {attemptCount}</div>
// //       {error && <div>Error: {error.message}</div>}
// //     </div>
// //   );
// // }
