"use client";
import { CheckCircleIcon, StopCircleIcon } from "@heroicons/react/24/solid";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useMemo, type PropsWithChildren } from "react";

interface HCodeStatus {
  id: string;
  label: string;
  value: string | number | boolean | null | undefined;
  status: boolean;
}

interface HCodeDetailsProps {
  code?: string | undefined;
  grp?: string | undefined;
  nonce?: string | undefined;
  sha?: string | undefined;
  expiry: string | undefined;
}

export const HCodeDetails = ({
  code,
  grp,
  nonce,
  sha,
  expiry,
}: HCodeDetailsProps) => {
  const pathname = usePathname();
  const valid_url = pathname === "/hcode";

  const status_data: HCodeStatus[] = useMemo(
    () => [
      {
        id: "url",
        label: "URL",
        value: valid_url ? "Valid URL" : "Invalid URL",
        status: valid_url,
      },
      {
        id: "key",
        label: "Key",
        value: code,
        status: !!code,
      },
      {
        id: "grp",
        label: "Grp",
        value: grp,
        status: !!grp,
      },
      {
        id: "nonce",
        label: "Nonce",
        value: nonce,
        status: !!nonce,
      },
      {
        id: "sha",
        label: "SHA",
        value: sha,
        status: !!sha,
      },
      {
        id: "expiry",
        label: "Expiry",
        value: expiry,
        status: expiry !== "Expired",
      },
      {
        id: "hcode",
        label: "Activation Code",
        value: null,
        status: false,
      },
    ],
    [code, expiry, grp, nonce, sha, valid_url],
  );

  return (
    <ListboxWrapper>
      <Listbox variant="faded" aria-label="HCode Details">
        {status_data.map(
          (item) => (
            <ListboxItem key={item.id} startContent={startContent(item.status)}>
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
  <div className="w-full rounded-b-small border-[0.33px] border-foreground/60 px-1 py-2">
    {children}
  </div>
);

const ListBoxContent = (props: {
  label: string;
  value: string | boolean | number | null | undefined;
}) => (
  <div className="flex w-full items-center justify-between whitespace-nowrap border-b border-dashed border-foreground/20">
    <p className="font-semibold text-foreground/90">{props.label}</p>
    <p className="font-jet text-foreground/80">{props.value}</p>
  </div>
);
const success = "text-success-600 size-4";
const idle = "text-zinc-600 size-4";

const startContent = (condition: boolean) =>
  condition ? (
    <CheckCircleIcon className={success} />
  ) : (
    <StopCircleIcon className={idle} />
  );
