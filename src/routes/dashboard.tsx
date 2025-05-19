import { SidebarInset, SidebarProvider } from '@marahuyo/react-ui/ui/sidebar';
import { Outlet, redirect, useLocation } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';
import { pb } from '../../lib/pocketbase';
import { AppSidebar } from '../components/app-sidebar';
import { TSRBreadCrumbs } from '../components/breadcrumbs';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  beforeLoad: () => {
    if (!pb.authStore.isValid) throw redirect({ to: '/login' });
  },
});

function RouteComponent() {
  return (
    <main>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <article className="p-2.5 no-scrollbar">
            <TSRBreadCrumbs />
            <Outlet />
          </article>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
