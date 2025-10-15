'use client'

import { getRouteApi, useNavigate, useRouter, useRouterState } from '@tanstack/react-router'
import { ChevronsUpDown, Plus } from 'lucide-react'
import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import type { SidebarType } from './app-sidebar'

export function SubSystemSwitcher({ subSystems }: { subSystems: SidebarType['subSystems'] }) {
  const navigate = useNavigate({ from: '/dashboard' })
  const router = useRouterState()

  const { isMobile } = useSidebar()
  const activeSubSystem = React.useMemo(
    () => subSystems.find((system) => router.location.pathname.startsWith(system.urlToMatch)),
    [router.location.pathname, subSystems],
  )

  if (!activeSubSystem) {
    return null
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
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <activeSubSystem.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeSubSystem.name}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-72 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Sub systems
            </DropdownMenuLabel>
            {subSystems.map((subSystem, index) => (
              <DropdownMenuItem
                key={subSystem.name}
                onClick={() => {
                  navigate({ to: subSystem.href })
                }}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <subSystem.logo className="size-3.5 shrink-0" />
                </div>
                {subSystem.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
