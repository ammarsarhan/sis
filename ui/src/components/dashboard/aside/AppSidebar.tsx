import {
  Archive,
  Bell,
  FileText,
  FolderOpen,
  GraduationCap,
  LayoutDashboard,
  Radio,
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

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    cycles: [
        {
            name: "Fall 2027",
            logo: Radio,
            plan: "Active",
        },
        {
            name: "Summer 2026",
            logo: Archive,
            plan: "Archived",
        },
        {
            name: "Fall 2026",
            logo: Archive,
            plan: "Archived",
        },
    ],
    main: [
        {
            title: "Home",
            url: "/dashboard/cycle-id/overview",
            icon: LayoutDashboard
        },
        {
            title: "Applications",
            url: "/dashboard/cycle-id/applications",
            icon: FileText,
            items: [
                { title: "All Applications", url: "/dashboard/cycle-id/applications" },
                { title: "Pending Review", url: "/dashboard/cycle-id/applications?status=SUBMITTED" },
                { title: "Accepted", url: "/dashboard/cycle-id/applications?status=ACCEPTED" },
                { title: "Rejected", url: "/dashboard/cycle-id/applications?status=REJECTED" },
            ],
        },
        {
            title: "Documents",
            url: "/dashboard/cycle-id/documents",
            icon: FolderOpen,
            items: [
                { title: "Review Queue", url: "/dashboard/cycle-id/documents" },
                { title: "Accepted", url: "/dashboard/cycle-id/documents?status=ACCEPTED" },
                { title: "Rejected", url: "/dashboard/cycle-id/documents?status=REJECTED" },
            ],
        },
        {
            title: "Applicants",
            url: "/dashboard/cycle-id/applicants",
            icon: Users,
        },
    ],
    configuration: [
        {
            title: "Notifications",
            url: "/dashboard/cycle-id/notifications",
            icon: Bell
        },
        {
            title: "Faculties",
            url: "/dashboard/faculties",
            icon: GraduationCap,
            items: [
                { title: "All Faculties", url: "/dashboard/faculties" },
                { title: "Departments", url: "/dashboard/faculties/departments" },
            ],
        },
        {
            title: "Settings",
            url: "/dashboard/cycle-id/settings",
            icon: Settings,
            items: [
                { title: "Cycle Settings", url: "/dashboard/cycle-id/settings" },
                { title: "Faculty Offerings", url: "/dashboard/cycle-id/settings/offerings" },
                { title: "Event Log", url: "/dashboard/cycle-id/settings/events" },
                { title: "Users & Permissions", url: "/dashboard/cycle-id/settings/users" },
            ],
        },
    ],
}

export default function AppSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <div className="flex items-center size-7 m-2 group-data-[collapsible=icon]:ml-0.5 transition-all">
                    <img src={Logo} alt="" className="size-full brightness-0 shrink-0 object-cover"/>
                </div>
                <CycleDropdown cycles={data.cycles} />
            </SidebarHeader>
            <SidebarContent>
                <AsideGroup title={"Quick Links"} items={data.main} />
                <AsideGroup title={"Configuration"} items={data.configuration} />
            </SidebarContent>
            <SidebarFooter>
                <UserDropdown user={data.user} />
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}
