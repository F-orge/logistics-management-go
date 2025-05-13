import { Button } from '@marahuyo/react-ui/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@marahuyo/react-ui/ui/card';
import { Input } from '@marahuyo/react-ui/ui/input';
import { Label } from '@marahuyo/react-ui/ui/label';
import { type AnyFieldApi, useForm } from '@tanstack/react-form';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { ClientResponseError } from 'pocketbase';
import { toast } from 'sonner';
import { pb } from '../../lib/pocketbase';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
  loader: async () => {
    if (pb.authStore.isValid) throw redirect({ to: '/dashboard' });
  },
});

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.join(', ')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  );
}

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      try {
        await pb
          .collection('users')
          .authWithPassword(value.email, value.password);
        window.location.href = '/dashboard';
      } catch (e) {
        if (e instanceof ClientResponseError) {
          toast(`Error ${e.status}`, { description: e.message });
        }
      }
    },
  });

  return (
    <main className="container mx-auto h-screen flex justify-center items-center">
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Enter your email and password below</CardDescription>
        </CardHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <CardContent className="flex flex-col gap-5">
            <form.Field name="email">
              {(field) => (
                <div className="flex flex-col gap-2.5">
                  <Label htmlFor={field.name}>Email</Label>
                  <Input
                    type="email"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
            <form.Field name="password">
              {(field) => (
                <div className="flex flex-col gap-2.5">
                  <Label htmlFor={field.name}>Password</Label>
                  <Input
                    type="password"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
          </CardContent>
          <CardFooter className="pt-4">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, _]) => (
                <Button isLoading={!canSubmit} className="w-full">
                  Sign in
                </Button>
              )}
            </form.Subscribe>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
