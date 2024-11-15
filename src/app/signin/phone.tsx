import { Badge, Button } from "@nextui-org/react";
import { type ChangeEvent, memo, useCallback, useMemo, useState } from "react";
import { CheckIcon, DevicePhoneMobileIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { InputField } from "@/ui/input";

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
          content={
            <CheckIcon className="size-2.5 shrink-0 stroke-[1.5px] text-foreground" />
          }
          shape="circle"
          showOutline={false}
          placement="bottom-right"
          color={isValidPhone ? "success" : "warning"}
          className="size-3"
        >
          <DevicePhoneMobileIcon className="size-5 animate-enter text-background" />
        </Badge>
      ) : (
        <div className="size-4" />
      ),
    [isValidPhone],
  );
  return (
    <form className="flex w-full flex-col gap-2 gap-y-4 space-y-6 py-2 xl:gap-6">
      <div className="h-fit w-full space-y-6 md:space-y-6">
        <div className="px-4 font-inst text-sm">Type in your phone number</div>
        <InputField
          className={cn("font-mono font-medium", {
            "opacity-100": phoneNumber !== "",
          })}
          start={DevicePhoneMobileIcon}
          size="lg"
          placeholder="91.."
          type="phone"
          value={phoneNumber}
          onChange={handlePhoneChange}
          end={ValidPhone}
        />
      </div>
      <div className="px-5 py-11 text-sm">
        <Button
          fullWidth
          size="lg"
          type="submit"
          variant="shadow"
          color="primary"
          disabled={isValidPhone}
          className="h-14 items-center space-x-4 rounded-md bg-background font-inst text-sm font-medium text-foreground hover:bg-background/80 sm:h-12"
        >
          <div>Sign in with phone</div>
          <DevicePhoneMobileIcon className="mx-2 size-5 shrink-0" />
        </Button>
      </div>
    </form>
  );
};

export const WithPhoneForm = memo(PhoneSigninForm);
