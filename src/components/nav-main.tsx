import { useNavigate } from '@tanstack/react-router';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { SidebarType } from './app-sidebar';

export function NavMain({
  systemNavs,
}: {
  systemNavs: SidebarType['navMain'];
}) {
  const navigate = useNavigate({ from: '/dashboard' });

  return (
    <SidebarGroup>
      {systemNavs.map((system) => (
        <>
          {system.navigation.map((nav) => (
            <>
              <SidebarGroupLabel>{nav.title}</SidebarGroupLabel>
              {nav.items.map((navItem) =>
                navItem.items ? (
                  <Collapsible
                    key={navItem.title}
                    asChild
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={navItem.title}>
                          {navItem.icon && <navItem.icon />}
                          <span>{navItem.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {navItem.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <a href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      tooltip={navItem.title}
                      onClick={() => navigate({ to: navItem.url })}
                    >
                      {navItem.icon && <navItem.icon />}
                      {navItem.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ),
              )}
            </>
          ))}
        </>
      ))}
    </SidebarGroup>
  );
}
