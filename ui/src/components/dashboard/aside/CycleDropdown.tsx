import { ChevronsUpDown } from "lucide-react";

import { useNavigate } from "@tanstack/react-router";
import type { DashboardAdmissionCycle } from "@/lib/types/AdmissionCycle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { useDashboard } from "@/providers/DashboardProvider";

export default function CycleDropdown() {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();
  const { cycles, cycle, setCycle } = useDashboard();

  const handleSelect = (target: DashboardAdmissionCycle) => {
    setCycle(target);
    navigate({ to: "/dashboard/$cycleId/overview", params: { cycleId: target.id }});
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <cycle.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{cycle.name}</span>
                <span className="truncate text-xs">{cycle.status}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Admission Cycles
            </DropdownMenuLabel>
            {cycles.map((item, index) => (
              <DropdownMenuItem
                key={item.name}
                onClick={() => handleSelect(item)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <item.logo className="size-3.5 shrink-0" />
                </div>
                {item.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}