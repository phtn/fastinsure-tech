import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/ui/chart";
import { useCallback, useMemo, useState } from "react";
import { CartesianGrid, Line, LineChart } from "recharts";

interface ChartData {
  date: string;
  desktop: number;
  mobile: number;
}

const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function Chart() {
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("desktop");

  const total = useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    [],
  );

  const Metrics = useCallback(
    () => (
      <div className="flex">
        {["desktop", "mobile"].map((key) => {
          const chart = key as keyof typeof chartConfig;
          return (
            <button
              key={chart}
              data-active={activeChart === chart}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-default/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => setActiveChart(chart)}
            >
              <span className="font-inst text-sm text-foreground/80">
                {chartConfig[chart].label}
              </span>
              <span className="font-jet text-lg font-bold leading-none sm:text-xl xl:text-3xl">
                {total[key as keyof typeof total].toLocaleString()}
              </span>
            </button>
          );
        })}
      </div>
    ),
    [activeChart, total],
  );

  return (
    <Card className="bg-background text-foreground shadow-xl shadow-background/20">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-4 py-2 font-inst xl:px-6 xl:py-6">
          <CardTitle className="text-lg xl:text-xl">
            Monthly Page Views
          </CardTitle>
          <CardDescription className="text-xs xl:text-sm">
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <Metrics />
      </CardHeader>
      <CardContent className="px-2 sm:p-4 xl:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[150px] w-full xl:h-[250px]"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid stroke="#eee" vertical={false} />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value: string) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line dataKey={activeChart} type="monotone" stroke={`#ccc`} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
const chartData: ChartData[] = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
];
