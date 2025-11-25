import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";
import { AppSidebar } from "@/components/app-sidebar";
import { SystemBreadcrumbs } from "@/components/system-breadcrumbs";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UsersRecord, UsersRolesOptions } from "@/lib/pb.types";

// Default landing page based on role
const getDefaultRoute = (roles?: UsersRolesOptions[]): string => {
  if (!roles || roles.length === 0) {
    return "/dashboard";
  }

  // Check roles in priority order
  if (
    roles.includes(UsersRolesOptions.admin) ||
    roles.includes(UsersRolesOptions.developer)
  ) {
    return "/dashboard/customer-relations/companies";
  }

  // CRM roles
  if (
    roles.includes(UsersRolesOptions["sales-rep"]) ||
    roles.includes(UsersRolesOptions["account-manager"]) ||
    roles.includes(UsersRolesOptions["sales-manager"]) ||
    roles.includes(UsersRolesOptions.sdr) ||
    roles.includes(UsersRolesOptions["marketing-manager"]) ||
    roles.includes(UsersRolesOptions["customer-support-agent"]) ||
    roles.includes(UsersRolesOptions["finance-manager"]) ||
    roles.includes(UsersRolesOptions.accountant)
  ) {
    return "/dashboard/customer-relations/companies";
  }

  // Warehouse roles
  if (
    roles.includes(UsersRolesOptions["inventory-manager"]) ||
    roles.includes(UsersRolesOptions["warehouse-manager"]) ||
    roles.includes(UsersRolesOptions["receiving-manager"]) ||
    roles.includes(UsersRolesOptions["warehouse-operator"]) ||
    roles.includes(UsersRolesOptions.picker) ||
    roles.includes(UsersRolesOptions.packer) ||
    roles.includes(UsersRolesOptions["returns-processor"]) ||
    roles.includes(UsersRolesOptions["qc-manager"]) ||
    roles.includes(UsersRolesOptions["product-manager"]) ||
    roles.includes(UsersRolesOptions["pricing-analyst"])
  ) {
    return "/dashboard/warehouse-management/products";
  }

  // Transport & Delivery roles
  if (
    roles.includes(UsersRolesOptions["logistics-coordinator"]) ||
    roles.includes(UsersRolesOptions["logistics-manager"]) ||
    roles.includes(UsersRolesOptions["logistics-planner"]) ||
    roles.includes(UsersRolesOptions.dispatcher) ||
    roles.includes(UsersRolesOptions.driver) ||
    roles.includes(UsersRolesOptions["fleet-manager"]) ||
    roles.includes(UsersRolesOptions["transport-manager"]) ||
    roles.includes(UsersRolesOptions.carrier)
  ) {
    return "/dashboard/transport-management/drivers";
  }

  // Default fallback
  return "/dashboard";
};

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
  validateSearch: zodValidator(z.object({ settings: z.boolean().optional() })),
  beforeLoad: async ({ context, location }) => {
    if (!context.pocketbase.authStore.isValid) {
      throw redirect({
        to: "/auth/login",
        search: { redirectTo: location.url },
      });
    }

    // Redirect to role-based default route if user is at /dashboard root
    if (
      location.pathname === "/dashboard" ||
      location.pathname === "/dashboard/"
    ) {
      const user = context.pocketbase.authStore
        .record as unknown as UsersRecord;
      const defaultRoute = getDefaultRoute(user.roles);
      throw redirect({
        to: defaultRoute,
      });
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
        <header className="flex h-12 sm:h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-10 sm:group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-2 sm:px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <SystemBreadcrumbs />
          </div>
        </header>
        <div className="p-2 sm:p-4 pt-0 overflow-x-auto mx-auto md:mx-8 lg:mx-16 max-w-full">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
