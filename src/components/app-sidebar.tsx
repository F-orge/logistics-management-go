import { getRouteApi, useRouterState } from '@tanstack/react-router';
import {
  Boxes,
  // CRM icons
  Building,
  Building2,
  Car,
  ChevronDown,
  Contact,
  DollarSign,
  FileText,
  type LucideIcon,
  MapPin,
  Megaphone,
  MessageCircle,
  Package,
  // LMS icons
  Package2,
  Plane,
  Receipt,
  // Organization icons
  Settings,
  Shield,
  Ship,
  ShoppingBag,
  Target,
  Truck,
  // TMS icons
  User,
  UserPlus,
  Users,
  UsersRound,
  Warehouse,
} from 'lucide-react';
import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';

// Get route API for dashboard to access current route information
const dashboardRouteApi = getRouteApi('/dashboard');

// Domain configuration
type Domain = {
  key: string;
  name: string;
  icon: LucideIcon;
  description: string;
  resources: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
};

const domains: Domain[] = [
  {
    key: 'crm',
    name: 'CRM',
    icon: Users,
    description: 'Customer Relations',
    resources: [
      { title: 'Companies', url: '/dashboard/crm/companies', icon: Building },
      { title: 'Contacts', url: '/dashboard/crm/contacts', icon: Contact },
      { title: 'Leads', url: '/dashboard/crm/leads', icon: UserPlus },
      {
        title: 'Opportunities',
        url: '/dashboard/crm/opportunities',
        icon: Target,
      },
      { title: 'Cases', url: '/dashboard/crm/cases', icon: FileText },
      { title: 'Products', url: '/dashboard/crm/products', icon: ShoppingBag },
      { title: 'Campaigns', url: '/dashboard/crm/campaigns', icon: Megaphone },
      {
        title: 'Interactions',
        url: '/dashboard/crm/interactions',
        icon: MessageCircle,
      },
      { title: 'Invoices', url: '/dashboard/crm/invoices', icon: Receipt },
    ],
  },
  {
    key: 'tms',
    name: 'TMS',
    icon: Truck,
    description: 'Transportation',
    resources: [
      { title: 'Drivers', url: '/dashboard/tms/drivers', icon: User },
      { title: 'Vehicles', url: '/dashboard/tms/vehicles', icon: Car },
    ],
  },
  {
    key: 'org',
    name: 'Organization',
    icon: Building2,
    description: 'Org Management',
    resources: [
      {
        title: 'Organization',
        url: '/dashboard/org/organization',
        icon: Settings,
      },
      { title: 'Teams', url: '/dashboard/org/teams', icon: UsersRound },
      { title: 'Roles', url: '/dashboard/org/roles', icon: Shield },
    ],
  },
  {
    key: 'lms',
    name: 'LMS',
    icon: Package,
    description: 'Logistics',
    resources: [
      { title: 'Shipments', url: '/dashboard/lms/shipments', icon: Ship },
      { title: 'Packages', url: '/dashboard/lms/packages', icon: Package2 },
      { title: 'Addresses', url: '/dashboard/lms/addresses', icon: MapPin },
      {
        title: 'Warehouses',
        url: '/dashboard/lms/warehouses',
        icon: Warehouse,
      },
      { title: 'Inventories', url: '/dashboard/lms/inventories', icon: Boxes },
      { title: 'Providers', url: '/dashboard/lms/providers', icon: Plane },
      { title: 'Shipping', url: '/dashboard/lms/shipping', icon: Truck },
      { title: 'Pricing', url: '/dashboard/lms/pricing', icon: DollarSign },
    ],
  },
];

function DomainSwitcher({
  domains,
  currentDomain,
}: {
  domains: Domain[];
  currentDomain: string;
}) {
  const navigate = dashboardRouteApi.useNavigate();

  // Get the correct active domain based on currentDomain prop
  const activeDomain =
    domains.find((domain) => domain.key === currentDomain) || domains[0];

  console.log(
    '🎯 DomainSwitcher - currentDomain:',
    currentDomain,
    'activeDomain:',
    activeDomain.key,
  );

  const handleDomainSwitch = React.useCallback(
    (domain: Domain) => {
      const firstResource = domain.resources[0];
      if (firstResource) {
        // Use replace instead of navigate for immediate effect
        navigate({ to: firstResource.url, replace: false });
      }
    },
    [navigate],
  );

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
                <activeDomain.icon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {activeDomain.name}
                </span>
                <span className="truncate text-xs">
                  {activeDomain.description}
                </span>
              </div>
              <ChevronDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            sideOffset={4}
          >
            {domains.map((domain) => (
              <DropdownMenuItem
                key={domain.key}
                onClick={() => handleDomainSwitch(domain)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <domain.icon className="size-3.5 shrink-0" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{domain.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {domain.description}
                  </span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Use useRouterState for reactive route changes
  const routerState = useRouterState();

  // Get current pathname directly from router state (reactive)
  const currentPath = routerState.location.pathname;

  // Extract domain from path immediately (no state delay)
  const pathParts = currentPath.split('/');
  const currentDomain = pathParts[2] || 'crm';

  // Debug: Log every render
  console.log('🔄 AppSidebar render - currentPath:', currentPath);
  console.log('📍 Path calculation:', {
    currentPath,
    pathParts,
    currentDomain,
  });

  // Get the current domain object
  const activeDomain = React.useMemo(() => {
    return domains.find((domain) => domain.key === currentDomain) || domains[0];
  }, [currentDomain]);

  // Convert resources to nav items format
  const navItems = React.useMemo(() => {
    return activeDomain.resources.map((resource) => ({
      title: resource.title,
      url: resource.url,
      icon: resource.icon, // Use the icon from the resource
      isActive: currentPath === resource.url,
    }));
  }, [activeDomain.resources, currentPath]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <DomainSwitcher domains={domains} currentDomain={currentDomain} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
