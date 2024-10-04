import { Badge, Button, Input } from "@nextui-org/react";
import { type ChangeEvent, useCallback, useMemo, useState } from "react";
import {
  ArrowRightEndOnRectangleIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export const PhoneSigninForm = () => {
  // const [selected, setSelected] = useState("login");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhone, setIsValidPhone] = useState(false);

  const validatePhone = useCallback((value: string) => {
    const isValid = value.length === 10 && value.startsWith("9");
    setIsValidPhone(isValid);
    return isValid ? isValid : undefined;
  }, []);

  const handlePhoneChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let input = e.target.value.replace(/\D/g, "");

      if (input.startsWith("0")) {
        input = input.substring(1);
      }

      input = input.slice(0, 10);

      if (input.length > 0) {
        input = "9" + input.slice(1);
      }
      validatePhone(e.target.value);

      setPhoneNumber(input);
    },
    [validatePhone],
  );

  // const onSelect = useCallback((key: Key) => setSelected(key as string), []);

  // const handlePressEnter = useCallback(
  //   (e: KeyboardEvent) => {
  //     if (e.key === "Enter" && !e.shiftKey) {
  //       e.preventDefault();
  //       if (isValidPhone) {
  //         setPhoneNumber("");
  //       }
  //     }
  //   },
  //   [isValidPhone],
  // );

  const ValidPhone = useMemo(
    () =>
      isValidPhone ? (
        <Badge
          size="sm"
          content=""
          shape="circle"
          showOutline={false}
          placement="bottom-right"
          classNames={
            {
              // badge: cn({ "hidden ": !props.dirty }),
            }
          }
          color={isValidPhone ? "success" : "warning"}
        >
          <DevicePhoneMobileIcon className="size-5 animate-enter text-primary" />
        </Badge>
      ) : (
        <div className="size-4" />
      ),
    [isValidPhone],
  );
  return (
    <form className="flex w-full flex-col gap-2 gap-y-4 space-y-6 py-2 xl:gap-6">
      <div className="h-fit w-full space-y-6 md:space-y-4">
        <div className="font-inst px-4 text-sm">Type your phone number</div>
        <Input
          className={cn("font-mono font-medium", {
            "opacity-100": phoneNumber !== "",
          })}
          classNames={{
            inputWrapper: "shadow-none",
            innerWrapper:
              "border-[0.33px]_ max-w-[325px] border-primary/20 flex-grow-0 px-4 h-14 sm:h-12 rounded-xl bg-primary-200/80",
            input: "leading-none font-normal tracking-widest font-mono text-xl",
          }}
          startContent={
            <p
              className={cn(
                "mr-2 text-xl font-medium leading-none text-foreground",
                {
                  "opacity-100": phoneNumber !== "",
                },
              )}
            >
              +63
            </p>
          }
          radius="md"
          placeholder="9..."
          type="phone"
          value={phoneNumber}
          onChange={handlePhoneChange}
          endContent={ValidPhone}
        />
      </div>
      <div className="space-y-4 px-3 text-sm">
        <Button
          type="submit"
          color="primary"
          isLoading={false}
          disabled={!isValidPhone}
          className="flex h-14 w-full items-center space-x-4 rounded-md sm:h-12"
        >
          <div>Sign in</div>
          <ArrowRightEndOnRectangleIcon className="mx-2 size-5 shrink-0" />
        </Button>
      </div>
    </form>
  );
};
