"use client"

// import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "./ui/button"

export const description = "An area chart with axes"

const chartData = [
  { day: "Sunday", desktop: 186, mobile: 80 },
  { day: "Monday", desktop: 305, mobile: 200 },
  { day: "Tuesday", desktop: 237, mobile: 120 },
  { day: "Wednesday", desktop: 73, mobile: 190 },
  { day: "Thursday", desktop: 209, mobile: 130 },
  { day: "Friday", desktop: 214, mobile: 140 },
  { day: "Saturday", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function TotalEnergyChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
            <CardTitle>Total energy production (KWH)</CardTitle>
            <div className="flex gap-2">
                <Button className="text-xs bg-[#EFF1ED] text-[#21250F] hover:text-white rounded border-[1px] border-[#373D20]">7 days</Button>
                <Button className="text-xs bg-[#EFF1ED] text-[#21250F] hover:text-white rounded border-[1px] border-[#373D20]">30 days</Button>
                <Button className="text-xs bg-[#EFF1ED] text-[#21250F] hover:text-white rounded border-[1px] border-[#373D20]">90 days</Button>
            </div>
        </div>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -20,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="mobile"
              type="natural"
              fill="hsla(72, 31%, 18%, 0.38)"
              fillOpacity={0.4}
              stroke="hsla(72, 31%, 18%, 1)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="hsla(12, 60%, 50%, 0.38)"
              fillOpacity={0.4}
              stroke="hsla(12, 60%, 50%, 1)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            {/* <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div> */}
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
                *Accounts only for markeplace activities
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
