import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@marahuyo/react-ui/ui/card';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { ClientResponseError } from 'pocketbase';
import { toast } from 'sonner';
import { z } from 'zod';
import { pb } from '../../lib/pocketbase';
import { useAppForm } from '../components/form';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
  beforeLoad: async () => {
    if (pb.authStore.isValid) throw redirect({ to: '/dashboard' });
  },
});

function RouteComponent() {
  const form = useAppForm({
    validators: {
      onChange: z.object({ email: z.string(), password: z.string() }),
    },
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
      <Card className="w-1/2 border-none bg-background">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Enter your email and password below</CardDescription>
        </CardHeader>
        <form.AppForm>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <CardContent className="flex flex-col gap-2.5">
              <form.AppField name="email">
                {(field) => (
                  <field.TextInputField
                    inputProps={{ type: 'email' }}
                    labelProps={{ children: 'Email' }}
                  />
                )}
              </form.AppField>
              <form.AppField name="password">
                {(field) => (
                  <field.TextInputField
                    inputProps={{ type: 'password' }}
                    labelProps={{ children: 'Password' }}
                  />
                )}
              </form.AppField>
            </CardContent>
            <CardFooter className="pt-4">
              <form.SubscribeButton
                buttonProps={{ children: 'Submit', className: 'w-full' }}
              />
            </CardFooter>
          </form>
        </form.AppForm>
      </Card>
    </main>
  );
}
