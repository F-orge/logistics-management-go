import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";
import { AppSidebar } from "@/components/app-sidebar";
import { SystemBreadcrumbs } from "@/components/system-breadcrumbs";
import { UsersRecord } from "@/lib/pb.types";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
  validateSearch: zodValidator(z.object({ settings: z.boolean().optional() })),
  beforeLoad: async ({ context }) => {
    if (context.pocketbase.authStore.isValid) {
      throw redirect({ to: "/" });
    }
  },
  loader: async ({ context }) => {
    return {
      user: context.pocketbase.authStore.record as unknown as UsersRecord,
    };
  },
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
