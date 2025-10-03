import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { auth } from '@/lib/auth';

const loginAction = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      email: z.email(),
      password: z.string().min(8, 'Minimum of 8 characters'),
    }),
  )
  .handler(({ data }) =>
    auth.api.signInEmail({
      body: { email: data.email, password: data.password },
    }),
  );

export const LoginForm = () => {
  return <div>LoginForm</div>;
};

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
