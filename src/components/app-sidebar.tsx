import {
  Boxes,
  BriefcaseBusiness,
  ClipboardList,
  Container,
  CreditCard,
  Forklift,
  LayoutDashboard,
  LogOut,
  Logs,
  MessageSquare,
  NotebookTabs,
  QrCode,
  ScrollText,
  User,
  UsersRound,
  Warehouse,
  Waypoints,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from '@marahuyo/react-ui/ui/sidebar';
import { pb } from '../../lib/pocketbase';
import { useUserRecord } from '../hooks/userInfo';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import UserProfile from './settings/user-profile';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      groupName: 'Overview',
      items: [
        {
          title: 'Dashboard',
          url: '/dashboard',
          icon: LayoutDashboard,
          isActive: true,
        },
      ],
    },
    {
      groupName: 'Finance',
      items: [
        {
          title: 'Invoices',
          url: '/dashboard/invoices',
          icon: ScrollText,
        },
        {
          title: 'Payments',
          url: '/dashboard/payments',
          icon: CreditCard,
        },
      ],
    },
    {
      groupName: 'Productivity',
      items: [
        {
          title: 'All Tasks',
          url: '/dashboard/tasks',
          icon: NotebookTabs,
        },
        {
          title: 'My Tasks',
          url: '/dashboard/tasks/my-tasks',
          icon: ClipboardList,
        },
        {
          title: 'Chat',
          url: '/dashboard/chat/',
          icon: MessageSquare,
        },
      ],
    },
    {
      groupName: 'Organization',
      items: [
        {
          title: 'Companies',
          url: '/dashboard/companies',
          icon: BriefcaseBusiness,
        },
        {
          title: 'Departments',
          url: '/dashboard/departments',
          icon: UsersRound,
        },
        {
          title: 'Warehouses',
          url: '/dashboard/warehouses',
          icon: Warehouse,
        },
      ],
    },
    {
      groupName: 'Inventory',
      items: [
        {
          title: 'Products',
          url: '/dashboard/products',
          icon: QrCode,
        },
        {
          title: 'Inventory',
          url: '/dashboard/inventory',
          icon: Boxes,
        },
      ],
    },
    {
      groupName: 'Operations',
      items: [
        {
          title: 'Orders',
          url: '/dashboard/orders',
          icon: Logs,
        },
        {
          title: 'Shipments',
          url: '/dashboard/shipments',
          icon: Container,
        },
        {
          title: 'Routes',
          url: '/dashboard/routes',
          icon: Waypoints,
        },
        {
          title: 'Vehicles',
          url: '/dashboard/vehicles',
          icon: Forklift,
        },
      ],
    },
  ],
  settings: [
    {
      id: 'profile-info',
      icon: User,
      text: 'Profile information',
      pageComponent: <UserProfile />,
    },
    {
      id: 'logout-trigger',
      icon: LogOut,
      text: 'Log out',
      onClick: () => {
        pb.authStore.clear();
        window.location.reload();
      },
      pageComponent: <></>,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUserRecord();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent className="no-scrollbar">
        <NavMain groups={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            email: userData?.email || '',
            name: userData?.name || '',
            avatar: `/api/files/_pb_${userData?.collectionName}_auth_/${userData?.id}/${userData?.avatar}`,
          }}
          settings={data.settings}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
