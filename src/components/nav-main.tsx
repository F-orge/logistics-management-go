import type { LucideIcon } from 'lucide-react';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@marahuyo/react-ui/ui/sidebar';
import { Link } from '@tanstack/react-router';

export function NavMain(props: {
  groups: {
    groupName: string;
    items: {
      title: string;
      url: string;
      icon?: LucideIcon;
      isActive?: boolean;
    }[];
  }[];
}) {
  return (
    <>
      <SidebarGroup>
        {props.groups.map((group) => (
          <div key={`sidebar-group-${group.groupName}`}>
            <SidebarGroupLabel>{group.groupName}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem
                  key={`sidebar-group-${group.groupName}-${item.title}`}
                >
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link to={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>
        ))}
      </SidebarGroup>
    </>
  );
}
