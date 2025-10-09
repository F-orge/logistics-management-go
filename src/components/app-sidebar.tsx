'use client';

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Building,
  Command,
  FileText,
  Frame,
  GalleryVerticalEnd,
  LifeBuoy,
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
      href: '/dashboard/crm/invoices',
    },
    {
      name: 'Warehouse Management',
      logo: GalleryVerticalEnd,
      urlToMatch: '/dashboard/wms',
      href: '/dashboard/wms/inbound-shipments',
    },
    {
      name: 'Billing Management',
      logo: GalleryVerticalEnd,
      urlToMatch: '/dashboard/billing',
      href: '/dashboard/billing/payments',
    },
    {
      name: 'Transport Management',
      logo: GalleryVerticalEnd,
      urlToMatch: '/dashboard/tms',
      href: '/dashboard/tms/drivers',
    },
    {
      name: 'Delivery Management',
      logo: GalleryVerticalEnd,
      urlToMatch: '/dashboard/dms',
      href: '/dashboard/dms/shipments',
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
              title: 'Opportunities',
              icon: TrendingUp,
              url: '/dashboard/crm/opportunities',
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
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
