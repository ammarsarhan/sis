"use client"

import { TrendingUp } from "lucide-react"
import { RadialBar, RadialBarChart } from "recharts"

import type { ChartConfig } from "@/components/ui/chart";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart";

const chartData = [
    { source: "online", revenue: 482000, fill: "var(--color-online)" },
    { source: "inPerson", revenue: 315000, fill: "var(--color-inPerson)" },
    { source: "international", revenue: 209000, fill: "var(--color-international)" },
]

const chartConfig = {
    revenue: {
        label: "Revenue",
    },
    online: {
        label: "Online",
        color: "var(--chart-1)",
    },
    inPerson: {
        label: "In-Person",
        color: "var(--chart-2)",
    },
    international: {
        label: "International",
        color: "var(--chart-3)",
    },
} satisfies ChartConfig

export function RevenueChart() {
    return (
        <Card className="flex flex-col border border-border/75 shadow-none ring-0">
            <CardHeader className="flex items-center gap-2 space-y-0 sm:flex-row">
                <div className="grid flex-1 gap-0.5">
                    <CardTitle>Revenue</CardTitle>
                    <CardDescription>
                        Showing the total revenue compared by channels.
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-62.5"
                >
                    <RadialBarChart data={chartData} innerRadius={40} outerRadius={110}>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel nameKey="source" />}
                        />
                        <RadialBar dataKey="revenue" background />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total revenue for the last 90d
                </div>
            </CardFooter>
        </Card>
    )
}