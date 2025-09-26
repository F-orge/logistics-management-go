import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { useAppForm } from '@/components/ui/form';
import { execute } from '@/lib/graphql/client/execute';
import type {
  SignInEmailInput,
  SignInEmailMutationVariables,
} from '@/lib/graphql/client/graphql';
import type { GetVariables } from '@/lib/utils';
import { signInMutation } from '@/queries/auth';
import { LoginForm } from './-form';

export const Route = createFileRoute('/auth/(layout)/login/')({
  component: RouteComponent,
  // beforeLoad: () => {
  //   if (pb.authStore.isValid) throw redirect({ to: '/dashboard/crm/leads' });
  // },
});

function RouteComponent() {
  const navigate = useNavigate({ from: '/auth/login' });

  const mutation = useMutation(signInMutation);

  const form = useAppForm({
    defaultValues: {} as SignInEmailInput,
    onSubmit: async ({ value }) =>
      mutation.mutateAsync(value, {
        onSuccess: () => navigate({ to: '/dashboard' }),
      }),
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
        <LoginForm form={form} />
        <form.SubmitButton className="col-span-full">Sign in</form.SubmitButton>
      </form.AppForm>
    </form>
  );
}
