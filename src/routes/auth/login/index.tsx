import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { auth } from '@/lib/auth';
import { LoginForm } from '@/components/login-form';

export const Route = createFileRoute('/auth/login/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginForm />;
}
