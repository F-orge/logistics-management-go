import { createFileRoute, Outlet } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';
import NewRole from './-new';

export const Route = createFileRoute('/admin/access-control')({
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({
      id: z.string().optional(),
      new: z.boolean().optional(),
      view: z.boolean().optional(),
      edit: z.boolean().optional(),
      delete: z.boolean().optional(),
    }),
  ),
});

function RouteComponent() {
  return (
    <>
      <Outlet />
      <NewRole />
    </>
  );
}
