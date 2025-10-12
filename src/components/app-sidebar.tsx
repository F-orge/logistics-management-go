'use client';

import {
  AudioWaveform,
  Bell,
  BookOpen,
  Bot,
  Building,
  Check,
  Command,
  FileText,
  Frame,
  GalleryVerticalEnd,
  LifeBuoy,
  Link,
  ListOrdered,
  Map,
  Megaphone,
  MessageCircle,
  Package,
  PackageSearch,
  PieChart,
  Settings2,
  SquareTerminal,
  TrendingUp,
  User2,
  UserPlus,
} from 'lucide-react';
import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { SubSystemSwitcher } from '@/components/subsystem-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavUser } from './nav-user';

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

const data: SidebarType = {
  subSystems: [
    {
      name: 'Customer Relation',
      logo: GalleryVerticalEnd,
      urlToMatch: '/dashboard/crm',
      href: '/dashboard/crm/companies',
    },
    {
      name: 'Warehouse Management',
      logo: GalleryVerticalEnd,
      urlToMatch: '/dashboard/wms',
      href: '/dashboard/wms/product',
    },
    {
      name: 'Billing Management',
      logo: GalleryVerticalEnd,
      urlToMatch: '/dashboard/billing',
      href: '/dashboard/billing/invoice',
    },
    {
      name: 'Transport Management',
      logo: GalleryVerticalEnd,
      urlToMatch: '/dashboard/tms',
      href: '/dashboard/tms/trip',
    },
    {
      name: 'Delivery Management',
      logo: GalleryVerticalEnd,
      urlToMatch: '/dashboard/dms',
      href: '/dashboard/dms/delivery-task',
    },
  ],
  navMain: [
    {
      subSystemUrl: '/dashboard/crm',
      navigation: [
        {
          title: 'Core',
          items: [
            {
              title: 'Companies',
              icon: Building,
              url: '/dashboard/crm/companies',
            },
            {
              title: 'Contacts',
              icon: User2,
              url: '/dashboard/crm/contacts',
            },
            {
              title: 'Leads',
              icon: UserPlus,
              url: '/dashboard/crm/leads',
            },
            {
              title: 'Opportunities',
              icon: TrendingUp,
              url: '/dashboard/crm/opportunities',
            },
          ],
        },
        {
          title: 'Sales',
          items: [
            {
              title: 'Campaigns',
              icon: Megaphone,
              url: '/dashboard/crm/campaigns',
            },
            {
              title: 'Products',
              icon: Package,
              url: '/dashboard/crm/products',
            },
          ],
        },
        {
          title: 'Billing',
          items: [
            {
              title: 'Invoices',
              icon: FileText,
              url: '/dashboard/crm/invoices',
            },
          ],
        },
        {
          title: 'Support',
          items: [
            {
              title: 'Cases',
              icon: LifeBuoy,
              url: '/dashboard/crm/cases',
            },
            {
              title: 'Interactions',
              icon: MessageCircle,
              url: '/dashboard/crm/interactions',
            },
            {
              title: 'Notifications',
              icon: Bell,
              url: '/dashboard/crm/notifications',
            },
          ],
        },
      ],
    },
    {
      subSystemUrl: '/dashboard/wms',
      navigation: [
        {
          title: 'Inventory',
          items: [
            {
              title: 'Products',
              icon: Package,
              url: '/dashboard/wms/product',
            },
            {
              title: 'Inventory Stock',
              icon: ListOrdered,
              url: '/dashboard/wms/inventory-stock',
            },
            {
              title: 'Inventory Batch',
              icon: Bot,
              url: '/dashboard/wms/inventory-batch',
            },
            {
              title: 'Inventory Adjustment',
              icon: Settings2,
              url: '/dashboard/wms/inventory-adjustment',
            },
          ],
        },
        {
          title: 'Warehouse Operations',
          items: [
            {
              title: 'Warehouses',
              icon: Building,
              url: '/dashboard/wms/warehouse',
            },
            {
              title: 'Locations',
              icon: Map,
              url: '/dashboard/wms/location',
            },
            {
              title: 'Tasks',
              icon: Command,
              url: '/dashboard/wms/task',
            },
            {
              title: 'Pick Batches',
              icon: PackageSearch,
              url: '/dashboard/wms/pick-batch',
            },
            {
              title: 'Stock Transfers',
              icon: SquareTerminal,
              url: '/dashboard/wms/stock-transfer',
            },
            {
              title: 'Returns',
              icon: BookOpen,
              url: '/dashboard/wms/return',
            },
          ],
        },
        {
          title: 'Suppliers & Orders',
          items: [
            {
              title: 'Suppliers',
              icon: User2,
              url: '/dashboard/wms/supplier',
            },
            {
              title: 'Sales Orders',
              icon: FileText,
              url: '/dashboard/wms/sales-order',
            },
            {
              title: 'Inbound Shipments',
              icon: TrendingUp,
              url: '/dashboard/wms/inbound-shipment',
            },
            {
              title: 'Outbound Shipments',
              icon: TrendingUp,
              url: '/dashboard/wms/outbound-shipment',
            },
          ],
        },
        {
          title: 'Rules & Thresholds',
          items: [
            {
              title: 'Reorder Points',
              icon: AudioWaveform,
              url: '/dashboard/wms/reorder-point',
            },
            {
              title: 'Bin Thresholds',
              icon: Frame,
              url: '/dashboard/wms/bin-threshold',
            },
            {
              title: 'Putaway Rules',
              icon: Command,
              url: '/dashboard/wms/putaway-rule',
            },
          ],
        },
      ],
    },
    {
      subSystemUrl: '/dashboard/billing',
      navigation: [
        {
          title: 'Financials',
          items: [
            {
              title: 'Invoices',
              icon: FileText,
              url: '/dashboard/billing/invoice',
            },
            {
              title: 'Payments',
              icon: FileText,
              url: '/dashboard/billing/payment',
            },
            {
              title: 'Credit Notes',
              icon: FileText,
              url: '/dashboard/billing/credit-note',
            },
            {
              title: 'Quotes',
              icon: FileText,
              url: '/dashboard/billing/quote',
            },
          ],
        },
        {
          title: 'Accounts & Disputes',
          items: [
            {
              title: 'Client Accounts',
              icon: User2,
              url: '/dashboard/billing/client-account',
            },
            {
              title: 'Disputes',
              icon: LifeBuoy,
              url: '/dashboard/billing/dispute',
            },
          ],
        },
        {
          title: 'Rates & Sync',
          items: [
            {
              title: 'Rate Cards',
              icon: FileText,
              url: '/dashboard/billing/rate-card',
            },
            {
              title: 'Rate Rules',
              icon: FileText,
              url: '/dashboard/billing/rate-rule',
            },
            {
              title: 'Surcharges',
              icon: FileText,
              url: '/dashboard/billing/surcharge',
            },
            {
              title: 'Accounting Sync Logs',
              icon: FileText,
              url: '/dashboard/billing/accounting-sync-log',
            },
          ],
        },
      ],
    },
    {
      subSystemUrl: '/dashboard/tms',
      navigation: [
        {
          title: 'Operations',
          items: [
            {
              title: 'Trips',
              icon: Map,
              url: '/dashboard/tms/trip',
            },
            {
              title: 'Routes',
              icon: Map,
              url: '/dashboard/tms/route',
            },
            {
              title: 'Shipment Legs',
              icon: SquareTerminal,
              url: '/dashboard/tms/shipment-leg',
            },
            {
              title: 'Proof of Delivery',
              icon: Check,
              url: '/dashboard/tms/proof-of-delivery',
            },
          ],
        },
        {
          title: 'Fleet & Drivers',
          items: [
            {
              title: 'Drivers',
              icon: User2,
              url: '/dashboard/tms/driver',
            },
            {
              title: 'Vehicles',
              icon: Building,
              url: '/dashboard/tms/vehicle',
            },
            {
              title: 'GPS Pings',
              icon: Map,
              url: '/dashboard/tms/gps-ping',
            },
            {
              title: 'Geofences',
              icon: Frame,
              url: '/dashboard/tms/geofence',
            },
          ],
        },
        {
          title: 'Financials',
          items: [
            {
              title: 'Expenses',
              icon: FileText,
              url: '/dashboard/tms/expense',
            },
            {
              title: 'Partner Invoices',
              icon: FileText,
              url: '/dashboard/tms/partner-invoice',
            },
          ],
        },
      ],
    },
    {
      subSystemUrl: '/dashboard/dms',
      navigation: [
        {
          title: 'Deliveries',
          items: [
            {
              title: 'Delivery Tasks',
              icon: Command,
              url: '/dashboard/dms/delivery-task',
            },
            {
              title: 'Delivery Routes',
              icon: Map,
              url: '/dashboard/dms/delivery-route',
            },
            {
              title: 'Proof of Delivery',
              icon: Check,
              url: '/dashboard/dms/proof-of-delivery',
            },
            {
              title: 'Task Events',
              icon: ListOrdered,
              url: '/dashboard/dms/task-event',
            },
            {
              title: 'Customer Tracking Links',
              icon: Link,
              url: '/dashboard/dms/customer-tracking-link',
            },
          ],
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SubSystemSwitcher subSystems={data.subSystems} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain systemNavs={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
