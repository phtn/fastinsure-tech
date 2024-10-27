// import { useEffect } from "react";
// import { useHCode } from "./useHCode";

interface HCodeContentProps {
  key?: string;
  group?: string;
  nonce?: string;
  sha?: string;
}
export const HCodeContent = (params: HCodeContentProps) => {
  // const { setHCodeCookie } = useHCode();

  // useEffect(() => {
  //   setHCodeCookie(key).catch(console.error);
  // }, [key, setHCodeCookie]);
  console.log({ ...params });

  const arr: string[][] = Object.entries(params);

  const encodeUri = (param: string) => encodeURIComponent(param);

  const decodeRaw = (encoded: string) => {
    let val = encoded.replace(/%20/g, "__P__");
    val = decodeURIComponent(val);
    return val.replace(/__P__/g, "+");
  };

  return (
    <div className="p-6">
      {arr.map(([key, value]) => (
        <div key={key}>
          {key}: {decodeRaw(encodeUri(value ?? ""))}
        </div>
      ))}
    </div>
  );
};
