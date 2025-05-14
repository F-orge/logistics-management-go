import { ChevronsUpDown, type LucideIcon } from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@marahuyo/react-ui/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@marahuyo/react-ui/ui/dialog';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@marahuyo/react-ui/ui/sidebar';
import type React from 'react';
import { useState } from 'react';

export function NavUser({
  user,
  settings,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  settings: {
    id: string;
    icon: LucideIcon;
    text: string;
    onClick?: () => void;
    pageComponent: React.ReactNode;
  }[];
}) {
  const [currentPage, setCurrentPage] = useState(settings.at(0)?.id);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Dialog>
          <DialogTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DialogTrigger>
          <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
            <DialogTitle className="sr-only">Settings</DialogTitle>
            <DialogDescription className="sr-only">
              Customize your settings here.
            </DialogDescription>
            <SidebarProvider className="items-start">
              <Sidebar collapsible="none" className="hidden md:flex">
                <SidebarContent>
                  <SidebarGroup>
                    <SidebarMenu>
                      {settings.map((setting) => (
                        <SidebarMenuItem
                          onClick={setting.onClick}
                          key={`sidebar-settings-${setting.text}`}
                        >
                          <SidebarMenuButton
                            onClick={() => setCurrentPage(setting.id)}
                          >
                            <setting.icon />
                            <span>{setting.text}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroup>
                </SidebarContent>
              </Sidebar>
              <main className="flex h-full flex-1 flex-col overflow-hidden">
                <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 no-scrollbar">
                  {settings.find((e) => e.id === currentPage)?.pageComponent}
                </div>
              </main>
            </SidebarProvider>
          </DialogContent>
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
