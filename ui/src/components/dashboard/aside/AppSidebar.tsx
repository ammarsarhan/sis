import {
  Bell,
  FileText,
  FolderOpen,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react"

import AsideGroup from "@/components/dashboard/aside/AsideGroup";
import CycleDropdown from "@/components/dashboard/aside/CycleDropdown";
import UserDropdown from "@/components/dashboard/aside/UserDropdown";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import Logo from '@/assets/logo.png';
import { useDashboard } from "@/providers/DashboardProvider";

export default function AppSidebar() {
    const { cycle } = useDashboard();

    const data = {
        main: [
            {
                title: "Home",
                url: `/dashboard/${cycle.id}/overview`,
                icon: LayoutDashboard
            },
            {
                title: "Applications",
                url: `/dashboard/${cycle.id}/applications`,
                icon: FileText,
                items: [
                    { title: "All Applications", url: `/dashboard/${cycle.id}/applications` },
                    { title: "Pending Review", url: `/dashboard/${cycle.id}/applications?status=SUBMITTED` },
                    { title: "Accepted", url: `/dashboard/${cycle.id}/applications?status=ACCEPTED` },
                    { title: "Rejected", url: `/dashboard/${cycle.id}/applications?status=REJECTED` },
                ],
            },
            {
                title: "Documents",
                url: `/dashboard/${cycle.id}/documents`,
                icon: FolderOpen,
                items: [
                    { title: "Review Queue", url: `/dashboard/${cycle.id}/documents?status=UPLOADED` },
                    { title: "Accepted", url: `/dashboard/${cycle.id}/documents?status=ACCEPTED` },
                    { title: "Rejected", url: `/dashboard/${cycle.id}/documents?status=REJECTED` },
                ],
            },
            {
                title: "Applicants",
                url: `/dashboard/applicants`,
                icon: Users,
            },
        ],
        configuration: [
            {
                title: "Notifications",
                url: `/dashboard/notifications`,
                icon: Bell
            },
            {
                title: "Faculties",
                url: `/dashboard/faculties`,
                icon: GraduationCap,
                items: [
                    { title: "Browse Faculties", url: `/dashboard/faculties` },
                    { title: "View Departments", url: `/dashboard/faculties/faculty-id/departments` },
                ],
            },
            {
                title: "Settings",
                url: `/dashboard/${cycle.id}/settings`,
                icon: Settings,
                items: [
                    { title: "Cycle Settings", url: `/dashboard/${cycle.id}/settings` },
                    { title: "Faculty Offerings", url: `/dashboard/${cycle.id}/settings/offerings` },
                    { title: "Event Log", url: `/dashboard/${cycle.id}/settings/events` },
                    { title: "Users & Permissions", url: `/dashboard/${cycle.id}/settings/users` },
                ],
            },
        ],
    };

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <div className="flex items-center size-7 m-2 group-data-[collapsible=icon]:ml-0.5 transition-all">
                    <img src={Logo} alt="" className="size-full brightness-0 shrink-0 object-cover"/>
                </div>
                <CycleDropdown/>
            </SidebarHeader>
            <SidebarContent>
                <AsideGroup title={"Quick Links"} items={data.main} />
                <AsideGroup title={"Configuration"} items={data.configuration} />
            </SidebarContent>
            <SidebarFooter>
                <UserDropdown />
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}
