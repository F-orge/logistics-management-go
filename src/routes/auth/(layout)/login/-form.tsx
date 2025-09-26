import { withForm } from '@/components/ui/form';
import type { SignInEmailInput } from '@/lib/graphql/client/graphql';

export const LoginForm = withForm({
  defaultValues: {} as SignInEmailInput,
  render: function ({ form }) {
    return (
      <>
        <form.AppField name="email">
          {(field) => (
            <field.TextField
              className="col-span-full"
              label="Email"
              type="email"
            />
          )}
        </form.AppField>
        <form.AppField name="password">
          {(field) => (
            <field.TextField
              className="col-span-full"
              label="Password"
              type="password"
            />
          )}
        </form.AppField>
      </>
    );
  },
});
