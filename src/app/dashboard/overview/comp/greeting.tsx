import { HyperText } from "@/ui/hypertext";

interface GreetingProps {
  name?: string | null;
  email?: string | null;
}
export const Greeting = ({ name, email }: GreetingProps) => (
  <div className="flex w-full gap-2 whitespace-nowrap leading-none">
    <span>Hello,</span>
    <span className="font-medium lowercase">
      <HyperText text={name ?? email!} />
    </span>
  </div>
);
