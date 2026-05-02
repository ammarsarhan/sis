import { createFileRoute } from '@tanstack/react-router'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AnalyticsCard from '@/components/dashboard/hero/AnalyticsCard';
import ApplicationsChart from '@/components/dashboard/hero/ApplicationsChart';
import { ApplicationsTable } from '@/components/dashboard/hero/ApplicationsTable';
import { RevenueChart } from '@/components/dashboard/hero/RevenueChart';

export const Route = createFileRoute('/dashboard/$cycleId/overview/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4 my-auto"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Fall 2027</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <main className='flex flex-col gap-y-6 px-6 py-2'>
        <div className='flex flex-col gap-y-0.5'>
          <h1 className="font-medium text-2xl">Welcome back, Ammar</h1>
          <p className='text-sm text-gray-500'>Here's an overview of this cycle's performance analytics and recently active applicants.</p>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <div className="grid auto-rows-min gap-4 lg:grid-cols-3">
            <AnalyticsCard title={'Total Applications'} description={'All submitted applications'} value={'10,200'} rate={0.7} />
            <AnalyticsCard title={'Pending Applications'} description={'Applications awaiting review'} value={'728'} />
            <AnalyticsCard title={'Acceptance Rate'} description={'Across all faculties/dept.'} value={'27.2%'} rate={2.2} />
          </div>
        </div>
        <div className='flex flex-col lg:flex-row gap-x-4 gap-y-6'>
          <ApplicationsChart />
          <RevenueChart />
        </div>
        <ApplicationsTable />
      </main>
    </>
  )
}
