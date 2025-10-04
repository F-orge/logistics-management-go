import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { LoginForm } from '@/components/login-form';
import { auth } from '@/lib/auth';

export const Route = createFileRoute('/auth/login/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginForm />;
}
