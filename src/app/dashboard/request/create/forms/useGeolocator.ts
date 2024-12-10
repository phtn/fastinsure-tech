import { useCallback } from "react";
import usePH, { type PlaceProps } from "use-postal-ph";

export interface LocationValues {
  line_2: string;
  city: string;
  state: string;
  country: string;
}
export const useGeolocator = () => {
  const ph = usePH();

  const getLocation = useCallback(
    (postalCode: string) => {
      if (postalCode && postalCode.length >= 4) {
        const results = ph.fetchDataLists({
          post_code: +postalCode,
          limit: 10,
        });

        return { ...assignLocationValues(results?.data[0]) } as LocationValues;
      }
    },
    [ph],
  );

  return { getLocation };
};

const assignLocationValues = (data: PlaceProps | undefined) => ({
  city: data?.location,
  line_2: data?.municipality,
  state: data?.region,
  country: "PH",
});
