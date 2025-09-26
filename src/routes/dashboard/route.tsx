import {
  createFileRoute,
  Outlet,
  redirect,
  useRouterState,
} from '@tanstack/react-router';
import React from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  beforeLoad: () => {
    if (!localStorage.getItem('graphql-token')) {
      throw redirect({ to: '/auth/login' });
    }
  },
});

// Domain configuration for breadcrumbs
const domainLabels: Record<string, string> = {
  crm: 'CRM',
  tms: 'TMS',
  org: 'Organization',
  lms: 'LMS',
};

const resourceLabels: Record<string, string> = {
  // CRM resources
  companies: 'Companies',
  contacts: 'Contacts',
  leads: 'Leads',
  opportunities: 'Opportunities',
  cases: 'Cases',
  products: 'Products',
  campaigns: 'Campaigns',
  interactions: 'Interactions',
  invoices: 'Invoices',

  // TMS resources
  drivers: 'Drivers',
  vehicles: 'Vehicles',

  // Organization resources
  organization: 'Organization',
  teams: 'Teams',
  roles: 'Roles',

  // LMS resources
  shipments: 'Shipments',
  packages: 'Packages',
  addresses: 'Addresses',
  warehouses: 'Warehouses',
  inventories: 'Inventories',
  providers: 'Providers',
  shipping: 'Shipping',
  pricing: 'Pricing',
};

function DynamicBreadcrumb() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  // Parse the pathname to extract segments
  const pathSegments = pathname.split('/').filter(Boolean);

  // Build breadcrumb items
  const breadcrumbItems = React.useMemo(() => {
    const items: Array<{ label: string; href?: string; isLast: boolean }> = [];

    // Always start with Dashboard
    items.push({ label: 'Dashboard', href: '/dashboard', isLast: false });

    if (pathSegments.length > 1) {
      // Add domain (e.g., /dashboard/crm)
      const domain = pathSegments[1];
      const domainLabel = domainLabels[domain] || domain.toUpperCase();
      items.push({
        label: domainLabel,
        href: undefined, // Domain level isn't directly navigable
        isLast: pathSegments.length === 2,
      });

      if (pathSegments.length > 2) {
        // Add resource (e.g., /dashboard/crm/companies)
        const resource = pathSegments[2];
        const resourceLabel =
          resourceLabels[resource] ||
          resource.charAt(0).toUpperCase() + resource.slice(1);
        const resourceHref = `/${pathSegments.slice(0, 3).join('/')}`;
        items.push({
          label: resourceLabel,
          href: resourceHref,
          isLast: pathSegments.length === 3,
        });

        if (pathSegments.length > 3) {
          // Add action/subpage (e.g., /dashboard/crm/companies/new, /dashboard/crm/companies/123/edit)
          const action = pathSegments[3];

          // Handle specific action labels
          let actionLabel = action;
          if (action === 'new') actionLabel = 'New';
          else if (action === 'edit') actionLabel = 'Edit';
          else if (action === 'delete') actionLabel = 'Delete';
          else if (action.match(/^\d+$/)) {
            // If it's an ID, show as "View Details"
            actionLabel = 'View Details';

            // Check if there's another segment after the ID (like edit/delete)
            if (pathSegments.length > 4) {
              const subAction = pathSegments[4];
              if (subAction === 'edit') actionLabel = 'Edit';
              else if (subAction === 'delete') actionLabel = 'Delete';
            }
          }

          items.push({
            label: actionLabel,
            href: undefined, // Current page, no link
            isLast: true,
          });
        }
      }
    }

    // Mark the last item appropriately
    if (items.length > 0) {
      items[items.length - 1].isLast = true;
    }

    return items;
  }, [pathname, pathSegments]);

  if (breadcrumbItems.length <= 1) {
    // Only show breadcrumbs if we have more than just "Dashboard"
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem className={index === 0 ? 'hidden md:block' : ''}>
              {item.isLast ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : item.href ? (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              ) : (
                <span className="text-muted-foreground">{item.label}</span>
              )}
            </BreadcrumbItem>
            {!item.isLast && (
              <BreadcrumbSeparator
                className={index === 0 ? 'hidden md:block' : ''}
              />
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

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
            <DynamicBreadcrumb />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
