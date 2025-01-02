import { Image } from "@nextui-org/react";

export const Logo = (props: { size?: number }) => (
  <Image
    alt="logo"
    src="/svg/logo.svg"
    className="size-6 drop-shadow-xl"
    height={props.size ?? 24}
    width={props.size ?? 24}
  />
);

export const LogoLight = (props: { size?: number }) => (
  <Image
    alt="logo"
    src="/svg/f.svg"
    className="size-6 drop-shadow-xl"
    height={props.size ?? 24}
    width={props.size ?? 24}
  />
);
