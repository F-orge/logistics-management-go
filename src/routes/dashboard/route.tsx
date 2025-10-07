import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AppSidebar } from '@/components/app-sidebar';
import { SystemBreadcrumbs } from '@/components/system-breadcrumbs';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <SystemBreadcrumbs />
          </div>
        </header>
        <div className="p-4 pt-0 overflow-x-auto mx-16">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
