import { SidebarInset, SidebarProvider } from '@marahuyo/react-ui/ui/sidebar';
import { Outlet, redirect, useLocation } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';
import { pb } from '../../lib/pocketbase';
import { AppSidebar } from '../components/app-sidebar';
import { TSRBreadCrumbs } from '../components/breadcrumbs';
import NotificationSideSheet from './-notification-sheet';

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
            <div className="grid grid-cols-2 mb-2.5 pb-2.5 border-b items-center">
              <TSRBreadCrumbs />
              <NotificationSideSheet />
            </div>
            <Outlet />
          </article>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
