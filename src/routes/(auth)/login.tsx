import type { APIErrorResponse } from '@/lib/bindings/APIErrorResponse';
import type { TokenResponse } from '@/lib/bindings/TokenResponse';
import { useAppForm } from '@/components/ui/form';
import { client, type ValidationError } from '@/lib/api';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

export const Route = createFileRoute('/(auth)/login')({
  component: RouteComponent,
  beforeLoad: () => {
    if (window.localStorage.getItem('lms-token'))
      throw redirect({ to: '/admin' });
  },
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      try {
        const data = await toast
          .promise(
            client.post<TokenResponse>('/auth/login', value, {
              headers: { 'content-type': 'application/x-www-form-urlencoded' },
            }),
            {
              success: (_) => ({ message: 'Login sucessful. redirecting...' }),
            },
          )
          .unwrap();
        window.localStorage.setItem('lms-token', JSON.stringify(data.data));
        navigate({ to: '/admin' });
      } catch (e) {
        if (isAxiosError<APIErrorResponse>(e)) {
          if (e.status !== 400 && e.status !== 401) {
            throw e;
          }

          const err = e.response?.data;

          if (e.status === 400) {
            form.setErrorMap({
              onSubmit: {
                fields: err?.data as ValidationError,
              },
            });
          }

          toast.error('Authentication failed', { description: err?.message });
        }
      }
    },
  });

  return (
    <main className="flex h-screen justify-center items-center">
      <form
        className="grid grid-cols-4 gap-5 w-1/2"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.AppForm>
          <form.AppField name="email">
            {(field) => (
              <field.TextField
                label="Email"
                required
                className="col-span-full"
              />
            )}
          </form.AppField>
          <form.AppField name="password">
            {(field) => (
              <field.TextField
                label="Password"
                required
                type="password"
                className="col-span-full"
              />
            )}
          </form.AppField>
          <form.SubmitButton className="col-span-full">
            Sign in
          </form.SubmitButton>
        </form.AppForm>
      </form>
    </main>
  );
}
