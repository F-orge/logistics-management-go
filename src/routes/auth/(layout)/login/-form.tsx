import { withForm } from "@/components/ui/form";
import type { SignInMutation } from "@/graphql/auth";
import type { GetVariables } from "@/lib/utils";

export const LoginForm = withForm({
  defaultValues: {} as GetVariables<typeof SignInMutation>,
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
