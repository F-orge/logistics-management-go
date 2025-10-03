import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppForm } from './ui/form';
import { loginAction } from '@/db/schemas/better-auth/actions';
import { useNavigate } from '@tanstack/react-router';

export function LoginForm() {
  const navigate = useNavigate({ from: '/auth/login' });

  const form = useAppForm({
    defaultValues: {} as { email: string; password: string },
    onSubmit: async ({ value }) => {
      const result = await loginAction({
        data: { email: value.email, password: value.password },
      });

      // todo: redirect based on their roles
      navigate({ to: '/dashboard/crm/invoices' });
    },
  });

  return (
    <form
      className={cn('flex flex-col gap-6')}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.AppForm>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-6">
          <form.AppField name="email">
            {(field) => <field.TextField label="Email" />}
          </form.AppField>
          <form.AppField name="password">
            {(field) => (
              <field.TextField
                type="password"
                label={
                  <>
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </>
                }
              />
            )}
          </form.AppField>
          <form.SubmitButton type="submit" className="w-full">
            Login
          </form.SubmitButton>
        </div>
      </form.AppForm>
    </form>
  );
}
