import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { useAppForm } from '@/components/ui/form';
import { orpcSafeClient } from '@/index';
import { RegisterForm } from './-form';

export const Route = createFileRoute('/auth/(layout)/register/')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: '/auth/register' });

  const form = useAppForm({
    defaultValues: {} as ORPCInputs['auth']['signUp'] & {
      confirmPassword: string;
    },
    onSubmit: async ({ value }) => {
      const [error, result] = await orpcSafeClient.auth.signUp(value);

      if (value.password !== value.confirmPassword) {
        toast.error('Invalid Input', {
          description: 'Password does not match',
        });
      }

      if (error) toast.error(error.name, { description: error.message });

      // if we have token redirect directly to dashboard
      if (result!.token) {
        localStorage.setItem('orpc-jwt-token', result!.token);
        navigate({ to: '/dashboard' });
      } else {
        navigate({ to: '/auth/login' });
      }
    },
  });

  return (
    <form
      className="grid grid-cols-4 gap-2.5"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.AppForm>
        <RegisterForm form={form} />
        <form.SubmitButton className="col-span-full">
          Register
        </form.SubmitButton>
      </form.AppForm>
    </form>
  );
}
