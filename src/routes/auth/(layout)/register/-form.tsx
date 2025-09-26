import { withForm } from '@/components/ui/form';
import type { SignUpMutation } from '@/graphql/auth';
import type { GetVariables } from '@/lib/utils';

export const RegisterForm = withForm({
  defaultValues: {} as GetVariables<typeof SignUpMutation> & {
    confirmPassword: string;
  },
  render: function ({ form }) {
    return (
      <>
        <form.AppField name="name">
          {(field) => (
            <field.TextField
              label="Name"
              className="col-span-full"
              type="text"
              required
            />
          )}
        </form.AppField>
        <form.AppField name="email">
          {(field) => (
            <field.TextField
              label="Email"
              className="col-span-full"
              type="email"
              required
            />
          )}
        </form.AppField>
        <form.AppField name="password">
          {(field) => (
            <field.TextField
              label="Password"
              className="col-span-full"
              type="password"
              required
            />
          )}
        </form.AppField>
        <form.AppField name="confirmPassword">
          {(field) => (
            <field.TextField
              label="Confirm password"
              className="col-span-full"
              type="password"
              required
            />
          )}
        </form.AppField>
      </>
    );
  },
});
