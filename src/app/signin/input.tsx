import {
  EyeIcon,
  EyeSlashIcon,
  LockOpenIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import type { ClassName, DualIcon } from "../types";
import { useCallback, useMemo, useState } from "react";
import { opts, toggleState } from "@/utils/helpers";
import { InputField } from "@/ui/input";

interface InputProps {
  icon: DualIcon;
  name: string;
  className?: ClassName;
}

export const InputComponent = (props: InputProps) => {
  const [secure, setSecure] = useState(false);
  const toggleSecure = () => toggleState(setSecure);

  const IconOptions = useCallback(() => {
    const iconclass = "size-5 shrink-0 text-background/60";
    const options = opts(
      <EyeSlashIcon className={iconclass} />,
      <EyeIcon className={iconclass} />,
    );
    return <>{options.get(secure)}</>;
  }, [secure]);

  const startContent = useMemo(() => {
    const isPassword = props.name === "password";
    return isPassword && secure ? LockOpenIcon : props.icon;
  }, [props.icon, props.name, secure]);

  return (
    <InputField
      size="lg"
      start={startContent}
      name={props.name}
      end={
        props.name === "password" ? (
          <Button
            isIconOnly
            variant="flat"
            className="rounded-full border-0 bg-transparent hover:bg-transparent"
            onClick={toggleSecure}
          >
            <IconOptions />
          </Button>
        ) : null
      }
      secure={secure}
    />
  );
};
