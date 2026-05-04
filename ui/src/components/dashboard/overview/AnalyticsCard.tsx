import { TrendingUp } from "lucide-react";

export default function AnalyticsCard({ title, description, value, rate } : { title: string, description: string, value: string, rate?: number }) {
    return (
        <div className="flex items-center justify-between gap-x-8 rounded-xl bg-muted/50 p-6">
            <div className="flex flex-col gap-y-1">
                <span className="text-sm text-gray-500">{title}</span>
                <span className="font-medium text-black text-2xl">{value}</span>
                <span className="text-[0.8rem] text-gray-500">{description}</span>
            </div>
            {
                rate &&
                <div className="flex items-center mt-auto gap-x-1 p-1.5 bg-sidebar-primary text-sidebar-primary-foreground rounded-md">
                    <TrendingUp className="size-3.5"/>
                    <span className="text-xs">{rate}%</span>
                </div>
            }
        </div>
    )
}