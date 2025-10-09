import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useAppForm } from '@/components/form';
import { toast } from 'sonner';
import { authClient } from '@/lib/client-auth';

export const Route = createFileRoute('/auth/login/')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  const form = useAppForm({
    defaultValues: {} as {
      email: string;
      password: string;
      rememberMe: boolean;
    },
    onSubmit: ({ value }) =>
      toast.promise(
        authClient.signIn.email({
          email: value.email,
          password: value.password,
          rememberMe: value.rememberMe,
        }),
        {
          success: ({ data }) => {
            if (data?.redirect) {
              navigate({ to: data.url });
            }

            navigate({ to: '/dashboard/crm' });

            return 'Successfully logged in';
          },
        },
      ),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className={cn('flex flex-col gap-2.5')}
    >
      <form.AppForm>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your email below to login to your account
            </p>
          </div>
          <form.AppField name="email">
            {(field) => (
              <field.TextField
                label="Email"
                type="email"
                placeholder="m@example.com"
                required
              />
            )}
          </form.AppField>
          <form.AppField name="password">
            {(field) => (
              <field.TextField
                label={
                  <div className="flex justify-between">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Link
                      to="/auth/forgot-password"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                }
                type="password"
                placeholder="**********"
                required
              />
            )}
          </form.AppField>
          <form.AppField name="rememberMe">
            {(field) => (
              <field.CheckBoxField
                label={'Remember me'}
                type="password"
                placeholder="**********"
                required
              />
            )}
          </form.AppField>
          <Field>
            <form.SubmitButton type="submit">Login</form.SubmitButton>
          </Field>
          <Field>
            <FieldDescription className="text-center">
              Don&apos;t have an account?{' '}
              <Link to="/auth/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form.AppForm>
    </form>
  );
}
