"use client";

import { useRouteContext } from "@tanstack/react-router";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Building,
  Check,
  Command,
  FileText,
  Frame,
  GalleryVerticalEnd,
  LifeBuoy,
  ListOrdered,
  Map as MapIcon,
  Megaphone,
  MessageCircle,
  Package,
  PackageSearch,
  Settings2,
  SquareTerminal,
  TrendingUp,
  User2,
  UserPlus,
} from "lucide-react";
import type * as React from "react";
import { NavMain } from "@/components/nav-main";
import { SubSystemSwitcher } from "@/components/subsystem-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  TypedPocketBase,
  UsersRecord,
  UsersRolesOptions,
} from "@/lib/pb.types";
import { NavUser } from "./nav-user";

// RBAC permission mappings
const rolePermissions: Record<
  UsersRolesOptions,
  {
    subSystems: string[];
    navigationSections: string[];
  }
> = {
  [UsersRolesOptions.admin]: {
    subSystems: [
      "customer-relations",
      "warehouse-management",
      "transport-management",
      "delivery-management",
    ],
    navigationSections: ["all"],
  },
  [UsersRolesOptions.developer]: {
    subSystems: [
      "customer-relations",
      "warehouse-management",
      "transport-management",
      "delivery-management",
    ],
    navigationSections: ["all"],
  },
  [UsersRolesOptions.user]: {
    subSystems: [
      "customer-relations",
      "warehouse-management",
      "transport-management",
      "delivery-management",
    ],
    navigationSections: ["all"],
  },
  [UsersRolesOptions["sales-rep"]]: {
    subSystems: ["customer-relations"],
    navigationSections: ["Core", "Sales"],
  },
  [UsersRolesOptions["account-manager"]]: {
    subSystems: ["customer-relations"],
    navigationSections: ["Core", "Sales", "Billing"],
  },
  [UsersRolesOptions["inventory-manager"]]: {
    subSystems: ["warehouse-management"],
    navigationSections: ["Inventory"],
  },
  [UsersRolesOptions["warehouse-manager"]]: {
    subSystems: ["warehouse-management"],
    navigationSections: [
      "Inventory",
      "Warehouse Operations",
      "Suppliers & Orders",
    ],
  },
  [UsersRolesOptions["receiving-manager"]]: {
    subSystems: ["warehouse-management"],
    navigationSections: ["Warehouse Operations", "Suppliers & Orders"],
  },
  [UsersRolesOptions["warehouse-operator"]]: {
    subSystems: ["warehouse-management"],
    navigationSections: ["Warehouse Operations"],
  },
  [UsersRolesOptions.picker]: {
    subSystems: ["warehouse-management"],
    navigationSections: ["Inventory", "Warehouse Operations"],
  },
  [UsersRolesOptions.packer]: {
    subSystems: ["warehouse-management"],
    navigationSections: ["Warehouse Operations"],
  },
  [UsersRolesOptions["returns-processor"]]: {
    subSystems: ["warehouse-management"],
    navigationSections: ["Warehouse Operations"],
  },
  [UsersRolesOptions["qc-manager"]]: {
    subSystems: ["warehouse-management"],
    navigationSections: ["Inventory", "Warehouse Operations"],
  },
  [UsersRolesOptions["logistics-coordinator"]]: {
    subSystems: ["transport-management", "delivery-management"],
    navigationSections: ["all"],
  },
  [UsersRolesOptions["logistics-manager"]]: {
    subSystems: [
      "warehouse-management",
      "transport-management",
      "delivery-management",
    ],
    navigationSections: ["all"],
  },
  [UsersRolesOptions["logistics-planner"]]: {
    subSystems: ["transport-management", "delivery-management"],
    navigationSections: ["all"],
  },
  [UsersRolesOptions.dispatcher]: {
    subSystems: ["transport-management", "delivery-management"],
    navigationSections: ["all"],
  },
  [UsersRolesOptions.driver]: {
    subSystems: ["delivery-management"],
    navigationSections: ["all"],
  },
  [UsersRolesOptions["fleet-manager"]]: {
    subSystems: ["transport-management"],
    navigationSections: ["all"],
  },
  [UsersRolesOptions["transport-manager"]]: {
    subSystems: ["transport-management", "delivery-management"],
    navigationSections: ["all"],
  },
  [UsersRolesOptions["finance-manager"]]: {
    subSystems: ["customer-relations"],
    navigationSections: ["Billing"],
  },
  [UsersRolesOptions["marketing-manager"]]: {
    subSystems: ["customer-relations"],
    navigationSections: ["Core", "Sales"],
  },
  [UsersRolesOptions["customer-support-agent"]]: {
    subSystems: ["customer-relations"],
    navigationSections: ["Core", "Support"],
  },
  [UsersRolesOptions["product-manager"]]: {
    subSystems: ["customer-relations", "warehouse-management"],
    navigationSections: ["Sales", "Inventory"],
  },
  [UsersRolesOptions.client]: {
    subSystems: [],
    navigationSections: [],
  },
  [UsersRolesOptions["client-admin"]]: {
    subSystems: ["customer-relations"],
    navigationSections: ["Core"],
  },
  [UsersRolesOptions["end-customer"]]: {
    subSystems: [],
    navigationSections: [],
  },
  [UsersRolesOptions.sdr]: {
    subSystems: ["customer-relations"],
    navigationSections: ["Core", "Sales"],
  },
  [UsersRolesOptions["sales-manager"]]: {
    subSystems: ["customer-relations"],
    navigationSections: ["Core", "Sales", "Billing"],
  },
  [UsersRolesOptions["pricing-analyst"]]: {
    subSystems: ["customer-relations", "warehouse-management"],
    navigationSections: ["Sales", "Suppliers & Orders"],
  },
  [UsersRolesOptions.accountant]: {
    subSystems: ["customer-relations"],
    navigationSections: ["Billing"],
  },
  [UsersRolesOptions.carrier]: {
    subSystems: ["transport-management"],
    navigationSections: ["Fleet & Drivers"],
  },
};

export type SidebarType = {
  subSystems: {
    name: string;
    logo: React.ElementType;
    urlToMatch: string;
    href: string;
  }[];
  navMain: {
    subSystemUrl: string;
    navigation: {
      title: string;
      items: {
        title: string;
        url: string;
        icon: React.ElementType;
        items?: {
          title: string;
          url: string;
        }[];
      }[];
    }[];
  }[];
};

/**
 * Get allowed subSystems and navigation sections based on user roles
 * Aggregates permissions across all roles assigned to the user
 */
const getAllowedPermissions = (roles?: UsersRolesOptions[]) => {
  if (!roles || roles.length === 0) {
    return { subSystems: [], navigationSections: [] };
  }

  const allowedSubSystems = new Set<string>();
  const allowedNavSections = new Set<string>();

  for (const role of roles) {
    const permission = rolePermissions[role];
    if (permission) {
      permission.subSystems.forEach((sys) => allowedSubSystems.add(sys));
      permission.navigationSections.forEach((section) =>
        allowedNavSections.add(section)
      );
    }
  }

  return {
    subSystems: Array.from(allowedSubSystems),
    navigationSections: Array.from(allowedNavSections),
  };
};

export const getNavigation = (pocketbase: TypedPocketBase): SidebarType => {
  const user = pocketbase.authStore.record as unknown as UsersRecord;

  const {
    subSystems: allowedSubSystems,
    navigationSections: allowedNavSections,
  } = getAllowedPermissions(user.roles);

  // Check if user has "all" permission (admin/developer)
  const hasAllPermission = allowedNavSections.includes("all");

  // Filter subSystems based on allowed permissions
  const filteredSubSystems = navigation.subSystems.filter((system) => {
    // Extract subsystem name from urlToMatch (e.g., "/dashboard/customer-relations" -> "customer-relations")
    const subsystemName = system.urlToMatch.split("/").pop() || "";
    return allowedSubSystems.includes(subsystemName);
  });

  // Filter navigation sections based on allowed permissions
  const filteredNavMain = navigation.navMain
    .map((navSection) => ({
      ...navSection,
      navigation: navSection.navigation.filter(
        (section) =>
          hasAllPermission || allowedNavSections.includes(section.title)
      ),
    }))
    .filter((navSection) => navSection.navigation.length > 0);

  console.log("Filtered Navigation:", {
    subSystems: filteredSubSystems,
    navMain: filteredNavMain,
  });

  return {
    subSystems: filteredSubSystems,
    navMain: filteredNavMain,
  };
};

const navigation: SidebarType = {
  subSystems: [
    {
      name: "Customer Relation",
      logo: GalleryVerticalEnd,
      urlToMatch: "/dashboard/customer-relations",
      href: "/dashboard/customer-relations/companies",
    },
    {
      name: "Warehouse Management",
      logo: GalleryVerticalEnd,
      urlToMatch: "/dashboard/warehouse-management",
      href: "/dashboard/warehouse-management/products",
    },
    {
      name: "Transport Management",
      logo: GalleryVerticalEnd,
      urlToMatch: "/dashboard/transport-management",
      href: "/dashboard/transport-management/drivers",
    },
    {
      name: "Delivery Management",
      logo: GalleryVerticalEnd,
      urlToMatch: "/dashboard/delivery-management",
      href: "/dashboard/delivery-management/tasks",
    },
  ],
  navMain: [
    {
      subSystemUrl: "/dashboard/customer-relations",
      navigation: [
        {
          title: "Core",
          items: [
            {
              title: "Companies",
              icon: Building,
              url: "/dashboard/customer-relations/companies",
            },
            {
              title: "Contacts",
              icon: User2,
              url: "/dashboard/customer-relations/contacts",
            },
            {
              title: "Leads",
              icon: UserPlus,
              url: "/dashboard/customer-relations/leads",
            },
            {
              title: "Opportunities",
              icon: TrendingUp,
              url: "/dashboard/customer-relations/opportunities",
            },
          ],
        },
        {
          title: "Sales",
          items: [
            {
              title: "Campaigns",
              icon: Megaphone,
              url: "/dashboard/customer-relations/campaigns",
            },
            {
              title: "Products",
              icon: Package,
              url: "/dashboard/customer-relations/products",
            },
          ],
        },
        {
          title: "Billing",
          items: [
            {
              title: "Invoices",
              icon: FileText,
              url: "/dashboard/customer-relations/invoices",
            },
          ],
        },
        {
          title: "Support",
          items: [
            {
              title: "Cases",
              icon: LifeBuoy,
              url: "/dashboard/customer-relations/cases",
            },
            {
              title: "Interactions",
              icon: MessageCircle,
              url: "/dashboard/customer-relations/interactions",
            },
          ],
        },
      ],
    },
    {
      subSystemUrl: "/dashboard/warehouse-management",
      navigation: [
        {
          title: "Inventory",
          items: [
            {
              title: "Products",
              icon: Package,
              url: "/dashboard/warehouse-management/products",
            },
            {
              title: "Inventory Stock",
              icon: ListOrdered,
              url: "/dashboard/warehouse-management/inventory-stock",
            },
            {
              title: "Inventory Batch",
              icon: Bot,
              url: "/dashboard/warehouse-management/inventory-batches",
            },
            {
              title: "Inventory Adjustment",
              icon: Settings2,
              url: "/dashboard/warehouse-management/inventory-adjustment",
            },
          ],
        },
        {
          title: "Warehouse Operations",
          items: [
            {
              title: "Warehouses",
              icon: Building,
              url: "/dashboard/warehouse-management/warehouses",
            },
            {
              title: "Locations",
              icon: MapIcon,
              url: "/dashboard/warehouse-management/locations",
            },
            {
              title: "Packages",
              icon: Package,
              url: "/dashboard/warehouse-management/packages",
            },
            {
              title: "Returns",
              icon: BookOpen,
              url: "/dashboard/warehouse-management/returns",
            },
          ],
        },
        {
          title: "Suppliers & Orders",
          items: [
            {
              title: "Suppliers",
              icon: User2,
              url: "/dashboard/warehouse-management/suppliers",
            },
            {
              title: "Sales Orders",
              icon: FileText,
              url: "/dashboard/warehouse-management/sales-orders",
            },
            {
              title: "Inbound Shipments",
              icon: TrendingUp,
              url: "/dashboard/warehouse-management/inbound-shipments",
            },
            {
              title: "Outbound Shipments",
              icon: TrendingUp,
              url: "/dashboard/warehouse-management/outbound-shipments",
            },
          ],
        },
      ],
    },
    {
      subSystemUrl: "/dashboard/transport-management",
      navigation: [
        {
          title: "Fleet & Drivers",
          items: [
            {
              title: "Drivers",
              icon: User2,
              url: "/dashboard/transport-management/drivers",
            },
            {
              title: "Vehicles",
              icon: Building,
              url: "/dashboard/transport-management/vehicles",
            },
            {
              title: "Carriers",
              icon: Building,
              url: "/dashboard/transport-management/carriers",
            },
          ],
        },
      ],
    },
    {
      subSystemUrl: "/dashboard/delivery-management",
      navigation: [
        {
          title: "Deliveries",
          items: [
            {
              title: "Delivery Tasks",
              icon: Command,
              url: "/dashboard/delivery-management/tasks",
            },
            {
              title: "Proof of Deliveries",
              icon: Check,
              url: "/dashboard/delivery-management/proof-of-deliveries",
            },
            {
              title: "Driver Location",
              icon: MapIcon,
              url: "/dashboard/delivery-management/driver-location",
            },
          ],
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { pocketbase } = useRouteContext({ from: "/dashboard" });
  const filteredNavigation = getNavigation(pocketbase);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SubSystemSwitcher subSystems={filteredNavigation.subSystems} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain systemNavs={filteredNavigation.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
