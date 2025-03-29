"use client"

import { useAuthCtx } from "@/app/ctx/auth/auth";
import { type ClassName } from "@/app/types";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { ButtSex } from "@/ui/button/ripple";
import { HyperList } from "@/ui/list";
import { Image } from "@nextui-org/react";
import { useMemo } from "react";
import { CardList } from "./card-list";

export const Content = () => {
  const {user, vxuser} = useAuthCtx()

  const decks = useMemo(() => [
    {
      id: "1",
      title: "My First Deck",
      description: "This is my first deck",
      cover: "/svg/centric.svg",
      coverStyle: "",
      label: "View Dashboard",
      clickFn: () => console.log("Clicked on My First Deck"),
    },
    {
      id: "2",
      title: "My Second Deck",
      description: "This is my second deck",
      cover: "/svg/dots.svg",
      coverStyle: "right-0",
      label: "My Second Deck",
      clickFn: () => console.log("Clicked on My Second Deck"),

    },
  ] as IDeckItem[], [])
  return (
    <div className="space-y-8">
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl h-44 md:h-96",
        "bg-gradient-to-br from-white via-white/60 to-slate-400/40 border border-macl-gray drop-shadow-sm",
      )}
    >
      <div className="border border-chalk h-full rounded-[15px]">
        <div className="flex h-2/6 p-8">
          <div className="font-inst flex space-x-2 text-3xl tracking-tighter font-bold text-primary dark:text-chalk/80">
            <Icon name="sparkle" className="text-macl-indigo size-4" /><span>Hello, </span><span className="font-extrabold text-macd-blue">{user?.email?.split("@").shift()}</span>!
          </div>
        </div>

        <div className="bg-gradient-to-br from-white via-orange-100/20 to-stone-300/30 flex px-6 md:px-8 w-full items-center h-4/6">
          <CardList group_code={vxuser?.group_code} />
        </div>
      </div>
    </div>
    <div></div>
    <HyperList container="w-full px-4 grid grid-cols-1 md:grid-cols-4 md:gap-8" data={decks} component={DeckItem} keyId="id"/>
    </div>
  );
};

interface IDeckItem {
  id: string;
  title: string;
  description: string;
  cover: string;
  coverStyle: ClassName
  clickFn: VoidFunction
  label: string
}

const DeckItem = ({ label, cover, coverStyle }: IDeckItem) => {
  return (
    <div className=" border border-macl-gray group/deck h-80 rounded-2xl bg-orange-100/20 overflow-hidden">
      <div className="h-5/6 relative">
        <Image isBlurred src={cover} height={280} width={280} alt="Mesh" className={cn("w-full grayscale group-hover/deck:grayscale-0 scale-150 absolute -top-32 -left-16 aspect-square h-full object-cover", coverStyle)} />
      </div>
      <div className="h-1/6 items-center relative flex w-full pe-1 z-50 justify-end overflow-hidden">
        <ButtSex size="sm" inverted className="px-6 w-full">{label}</ButtSex>
      </div>
    </div>
  );
};
