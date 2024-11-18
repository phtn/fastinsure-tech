"use client";
import { useHCode } from "@/lib/hooks/useHCode";
import { CheckCircleIcon, StopCircleIcon } from "@heroicons/react/24/solid";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, type PropsWithChildren } from "react";

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
  verified: boolean | null;
}

export const HCodeDetails = ({
  code,
  grp,
  nonce,
  sha,
  expiry,
  verified,
}: HCodeDetailsProps) => {
  const pathname = usePathname();
  const valid_url = pathname === "/hcode";
  const { checkStatuses } = useHCode();

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
        value: !expiry
          ? "Activation code is required to get expiry date."
          : "Expired",
        status: !!expiry,
      },
      {
        id: "hcode",
        label: "Activation Code",
        value: verified ? "Activation Code Verified" : null,
        status: !!verified,
      },
    ],
    [code, expiry, grp, nonce, sha, valid_url, verified],
  );

  const getStatuses = useMemo(
    () => status_data.filter((item) => item.status).some((s) => !s),
    [status_data],
  );

  useEffect(() => {
    checkStatuses(getStatuses);
  }, [checkStatuses, getStatuses]);

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
  <div className="w-full rounded-b-small border-[0.33px] border-primary-300 px-1 py-2">
    {children}
  </div>
);

const ListBoxContent = (props: {
  label: string;
  value: string | boolean | number | null | undefined;
}) => (
  <div className="flex w-full items-center justify-between whitespace-nowrap border-b border-dashed border-foreground/20 py-1">
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
