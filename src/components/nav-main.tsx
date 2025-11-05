import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { ChevronRight, type LucideIcon } from "lucide-react";
import React from "react";
import type { SidebarType } from "./app-sidebar";

export function NavMain({
  systemNavs,
}: {
  systemNavs: SidebarType["navMain"];
}) {
  const navigate = useNavigate({ from: "/dashboard" });
  const location = useLocation();

  return (
    <SidebarGroup>
      {systemNavs
        .filter((system) => location.pathname.startsWith(system.subSystemUrl))
        .map((system) => (
          <React.Fragment key={system.subSystemUrl}>
            {system.navigation.map((nav) => (
              <React.Fragment key={nav.title}>
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
                    <SidebarMenuItem key={navItem.title}>
                      <SidebarMenuButton
                        tooltip={navItem.title}
                        onClick={() => navigate({ to: navItem.url })}
                      >
                        {navItem.icon && <navItem.icon />}
                        {navItem.title}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                )}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
    </SidebarGroup>
  );
}
