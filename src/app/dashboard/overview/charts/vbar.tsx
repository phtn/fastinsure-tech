"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/ui/chart";
// import { type IDMRequestSchema } from "@/server/resource/idm";
import { getPreviousMonths } from "@/utils/helpers";
import type { MonthName } from "@/app/types";
import type { ReactElement } from "react";
import { ArrowTrendingDownIcon } from "@heroicons/react/24/outline";
import type { IDMRequest } from "@/lib/conv/schema.ts/idm";
import { cn } from "@/lib/utils";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "gray",
  },
} satisfies ChartConfig;

type ReqComData = {
  month: MonthName | undefined;
  drafts: number | undefined;
  submitted: number | undefined;
};

export function VBar(props: { requests: IDMRequest[] | undefined }) {
  const drafts =
    props.requests?.filter((request) => request.status === "draft").length ?? 0;
  const submitted =
    props.requests?.filter((request) => request.status === "submitted")
      .length ?? 0;
  const chartData: ReqComData[] = getPreviousMonths().map((month) => ({
    month,
    drafts,
    submitted,
  }));
  return (
    <Card
      className={cn("h-full w-full border-0 text-foreground", "rounded-md")}
    >
      <CardHeader className="">
        <CardTitle className="text-sm leading-4">Request / Completed</CardTitle>
        <CardDescription className="text-xs font-light opacity-80">
          {chartData[0]?.month} - {chartData[chartData.length - 1]?.month}{" "}
          {new Date().getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} className="opacity-50" />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="drafts"
              fill="var(--color-desktop)"
              radius={4}
              className="drop-shadow-md"
            />
            <Bar
              dataKey="submitted"
              fill="var(--color-mobile)"
              radius={4}
              className="drop-shadow-md"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-xs">
        <GetTrend chartData={chartData} />
        {/* <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div> */}
      </CardFooter>
    </Card>
  );
}

const GetTrend = (props: { chartData: ReqComData[] }) => {
  const focusMonths = props.chartData.slice(props.chartData.length - 2);
  const percentChange =
    ((focusMonths[0]?.submitted ?? 0) / (focusMonths[1]?.submitted ?? 1)) * 100;

  return (
    <div className="flex gap-2 font-medium leading-none">
      {/* Submits are {getTrend(percentChange, "up", "down")} by {percentChange}% */}
      {getTrend(
        percentChange,
        <TrendingUp className="size-4" />,
        <ArrowTrendingDownIcon className="size-4" />,
      )}

      {` this month.`}
    </div>
  );
};

const getTrend = (
  change: number,
  up: string | ReactElement,
  down: string | ReactElement,
) => {
  if (change > 0) {
    return up;
  } else if (change < 0) {
    return down;
  } else return "No trend change";
};
