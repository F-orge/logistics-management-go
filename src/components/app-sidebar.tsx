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
import { getNavigationByRole } from '../../lib/utils';

const data = {
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

  const userRole = pb.authStore.record?.role || '';

  const navItems = getNavigationByRole(userRole);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent className="no-scrollbar">
        <NavMain groups={navItems} />
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
