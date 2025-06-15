import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from '@/components/ui/sidebar';
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from '@tanstack/react-router';
import { ShieldUser, Users } from 'lucide-react';

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
  beforeLoad: () => {
    if (!window.localStorage.getItem('lms-token'))
      throw redirect({ to: '/login' });
  },
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Administrator</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild size={'sm'}>
                  <Link to="/admin/users">
                    <Users />
                    User Management
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild size={'sm'}>
                  <Link to="/admin/access-control">
                    <ShieldUser />
                    Access Control
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <main className="p-4 h-full w-full grid grid-cols-12 gap-5 container mx-auto max-w-6xl">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
