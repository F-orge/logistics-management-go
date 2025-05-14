import { SidebarInset, SidebarProvider } from '@marahuyo/react-ui/ui/sidebar';
import { Outlet, redirect } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';
import { pb } from '../../lib/pocketbase';
import { AppSidebar } from '../components/app-sidebar';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  loader: () => {
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
            <Outlet />
          </article>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
