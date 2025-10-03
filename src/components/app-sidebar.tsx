'use client';

import * as React from 'react';
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import { SubSystemSwitcher } from '@/components/subsystem-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

export type SidebarType = {
  subSystem: {
    name: string;
    logo: React.ElementType;
    urlToMatch: string;
    href: string;
  }[];
  navMain: {
    title: string;
    items: {
      title: string;
      url: string;
      icon: React.ElementType;
      isActive: boolean;
      items: {
        title: string;
        url: string;
      }[];
    }[];
  };
};

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
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
      title: 'Playground',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'History',
          url: '#',
        },
        {
          title: 'Starred',
          url: '#',
        },
        {
          title: 'Settings',
          url: '#',
        },
      ],
    },
    {
      title: 'Models',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Genesis',
          url: '#',
        },
        {
          title: 'Explorer',
          url: '#',
        },
        {
          title: 'Quantum',
          url: '#',
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
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
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
