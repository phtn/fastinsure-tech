"use client";
import { CheckCircleIcon, StopCircleIcon } from "@heroicons/react/24/solid";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useMemo, type PropsWithChildren } from "react";
import type { HCode } from "@/server/secure/resource";
import { cn } from "@/lib/utils";

interface HCodeStatus {
  id: string;
  label: string;
  value: string | number | boolean | null | undefined;
  status: boolean;
}

// interface HCodeDetailsProps {
//   hkey?: string | undefined;
//   group?: string | undefined;
//   nonce?: string | undefined;
//   sha?: string | undefined;
//   expiry: string | undefined;
//   verified: boolean | null;
// }
//
interface HCodeDetail {
  hcode: HCode | null;
  expiry: string | null;
  verified?: boolean;
  // statusFn: (status: boolean) => void;
}

export const HCodeDetails = ({
  hcode,
  expiry,
  verified = false,
}: HCodeDetail) => {
  // const [checked, setChecked] = useState(false);
  const pathname = usePathname();
  const valid_url = pathname === "/hcode";

  const status_data: HCodeStatus[] = useMemo(
    () => [
      {
        id: "url",
        label: "URL",
        value: valid_url ? "OK" : "INVALID",
        status: valid_url,
      },
      {
        id: "key",
        label: "Key",
        value: hcode?.hkey ? "OK" : "INVALID",
        status: !!hcode?.hkey,
      },
      {
        id: "group",
        label: "Group",
        value: hcode?.grp ? "OK" : "INVALID",
        status: !!hcode?.grp,
      },
      {
        id: "nonce",
        label: "Nonce",
        value: hcode?.nonce ? "OK" : "INVALID",
        status: !!hcode?.nonce,
      },
      {
        id: "sha",
        label: "SHA",
        value: hcode?.sha ? "OK" : "INVALID",
        status: !!hcode?.sha,
      },
      {
        id: "expiry",
        label: "Expiry",
        // value: !expiry
        //   ? "Activation code is required to get expiry date."
        //   : "Expired",
        value: expiry,
        status: !!expiry && !expiry?.includes("ago"),
      },
      {
        id: "hcode",
        label: "Activation Code",
        value: verified ? "Verified!" : null,
        status: !!verified,
      },
    ],
    [hcode, valid_url, verified, expiry],
  );

  // const status = useMemo(
  //   () => status_data.filter((item) => item.status).some((s) => !s),
  //   [status_data],
  // );

  // const updateStatus = useCallback(
  //   (ok: boolean) => {
  //     if (!ok) setChecked(true);
  //   },
  //   [setChecked],
  // );

  // useEffect(() => {
  //   updateStatus(status);
  // }, [updateStatus, status]);

  return (
    <ListboxWrapper>
      <Listbox variant="faded" aria-label="HCode Details">
        {status_data.map(
          (item) => (
            <ListboxItem
              key={item.id}
              textValue={item.label}
              startContent={startContent(item.status)}
            >
              <ListBoxContent label={item.label} value={item.value} />
            </ListboxItem>
          ),
          [],
        )}
      </Listbox>
    </ListboxWrapper>
  );
};
const ListboxWrapper = ({ children }: PropsWithChildren) => (
  <div className="w-full px-4 py-2">{children}</div>
);

const ListBoxContent = (props: {
  label: string;
  value: string | boolean | number | null | undefined;
}) => (
  <div className="flex w-full items-center justify-between whitespace-nowrap border-b border-dashed border-foreground/20 py-1">
    <p className="font-semibold text-foreground/90">{props.label}</p>
    <p
      className={cn("font-jet text-foreground/80", {
        "text-rose-400": props.value?.toString().includes("ago"),
      })}
    >
      {props.value}
    </p>
  </div>
);
const success = "text-success-600 size-4";
const idle = "text-rose-400 size-4";

const startContent = (condition: boolean) =>
  condition ? (
    <CheckCircleIcon className={success} />
  ) : (
    <StopCircleIcon className={idle} />
  );
