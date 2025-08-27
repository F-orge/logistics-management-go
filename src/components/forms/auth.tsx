import type { UsersLogin } from '@/pocketbase/schemas/users';
import { withForm } from '../ui/form';

export const LoginForm = withForm({
  defaultValues: {} as UsersLogin,
  render: function ({ form }) {
    return (
      <>
        <form.AppField name="email">
          {(field) => <field.TextField label="Email" type="email" />}
        </form.AppField>
        <form.AppField name="password">
          {(field) => <field.TextField label="Password" type="password" />}
        </form.AppField>
      </>
    );
  },
});
