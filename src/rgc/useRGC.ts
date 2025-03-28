import {
  type Dispatch,
  type SetStateAction,
  type TransitionStartFunction,
  useCallback,
  useState,
  useTransition,
} from "react";
import { type Coordinates } from "./types";

export const useRGC = () => {
  const [coords, setCoords] = useState<Coordinates>();
  const [pending, fn] = useTransition();

  const setFn = <T>(
    xt: TransitionStartFunction,
    action: () => T,
    set: Dispatch<SetStateAction<T>>,
  ) => {
    xt(() => {
      set(action());
    });
  };

  const getCurrentPosition = useCallback((): Coordinates | undefined => {
    if ("geolocation" in navigator) {
      const geolocation = navigator?.geolocation;

      geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords)
          return position.coords as Coordinates;
        },
        (error) => {
          return error;
        },
      );
    } else {
      return undefined;
    }
  }, []);

  const getCoords = useCallback(() => {
    setFn(fn, getCurrentPosition, setCoords);
  }, [getCurrentPosition]);

  return { coords, getCoords, pending };
};
