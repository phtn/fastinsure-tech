"use client"

import { type ClassName } from "@/app/types";
import { MagicCard } from "@/components/magicui/magic-card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils";
import { useMemo, type ReactNode } from "react";

interface ICardItem {
  id: string;
  title: string;
  description: string;
  content: ReactNode
  style?: ClassName
}
interface CardListProps {
  group_code?: string;
}
export function CardList(props: CardListProps) {
  const cards = useMemo(() => [
    {
      id: "1",
      title: "Group Card",
      description: "Card Description",
      content: <div className="text-xs relative">
        <div className="text-xl">{props.group_code}</div>
        <div className="opacity-80">Group</div>
        <div className="size-24 absolute bg-[url('/svg/f_v2.svg')] bg-contain bg-no-repeat top-4 right-0"></div>
      </div>,
      style: "bg-void text-white p-4"
    },
    {
      id: "2",
      title: "Team Card",
      description: "Team Description",
      content: <div className="text-xs">
        <div className="h-12 px-4 border-b flex items-center text-[16px] font-medium tracking-tighter">Group Manager</div>
      </div>,
      style: "bg-macd-blue text-white"
    },
    {
      id: "3",
      title: "Role Card",
      description: "Role Description",
      content: <div className="text-xs p-4">Agent Roles Content</div>,
      style: "bg-gradient-to-r from-neutral-50 border border-macd-blue rounded-3xl via-slate-100/80 to-white text-primary"
    },
    {
      id: "4",
      title: "Support Card",
      description: "Support Description",
      content: <div className="text-xs p-4">Support Content</div>,
      style: "bg-gradient-to-r from-orange-100 via-orange-100/70 to-orange-100/60 text-primary"
    },
  ] as ICardItem[], [props])
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full mx-8"
    >
      <CarouselContent className="py-3">
        {cards.map((item) => (
          <CarouselItem key={item.id} className="drop-shadow-lg md:basis-1/2 lg:basis-1/3 border-none">
            <MagicCard className={cn("rounded-3xl overflow-hidden" )}>
              <div className={cn("h-52 bg-macd-blue/10 text-xs", item.style)}>
                {item.content}
              </div>
            </MagicCard>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

// <HyperList data={cards} container="flex" component={CardItem} keyId="id" />
// const CardItem = ({ id, title, description, content, style }: ICardItem) => (
//   <CarouselItem key={id} className="w-full md:basis-1/2 lg:basis-1/4">
//     <MagicCard className={`rounded-xl overflow-hidden`}>
//
//       {content}
//     </MagicCard>
//   </CarouselItem>
// );
