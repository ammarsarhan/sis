"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import type {ChartConfig} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
  
} from "@/components/ui/chart"

// Each axis is normalized to 0–100 for comparability
const chartData = [
  { metric: "Grade",         "2023": 79,  "2024": 82,  "2025": 87  },
  { metric: "Recency",       "2023": 33,  "2024": 66,  "2025": 100 },
  { metric: "Gap to Cutoff", "2023": 40,  "2024": 70,  "2025": 80  },
  { metric: "Channel",     "2023": 100, "2024": 100, "2025": 100 },
]

const chartConfig = {
  "2023": { label: "2023", color: "var(--chart-3)" },
  "2024": { label: "2024", color: "var(--chart-2)" },
  "2025": { label: "2025", color: "var(--chart-1)" },
} satisfies ChartConfig

export default function StrengthChart() {
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Strength Profile</CardTitle>
        <CardDescription>
          Comparing key metrics across all admission cycles
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-70 w-full"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <PolarGrid gridType="circle" />
            <PolarAngleAxis dataKey="metric" className="text-xs" />
            <Radar
              dataKey="2023"
              fill="var(--color-2023)"
              fillOpacity={0.15}
              stroke="var(--color-2023)"
              strokeWidth={1.5}
            />
            <Radar
              dataKey="2024"
              fill="var(--color-2024)"
              fillOpacity={0.2}
              stroke="var(--color-2024)"
              strokeWidth={1.5}
            />
            <Radar
              dataKey="2025"
              fill="var(--color-2025)"
              fillOpacity={0.3}
              stroke="var(--color-2025)"
              strokeWidth={2}
              dot={{ r: 3, fillOpacity: 1 }}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Strongest profile in the most recent cycle
        </div>
        <div className="text-muted-foreground leading-none text-[0.8125rem]">
          All metrics normalized to 0-100
        </div>
      </CardFooter>
    </Card>
  )
}