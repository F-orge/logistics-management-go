import { withForm } from "@/components/ui/form";

export const LoginForm = withForm({
  defaultValues: {} as ORPCInputs["auth"]["signIn"],
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
        <form.AppField name="rememberMe">
          {(field) => (
            <field.CheckBoxField
              className="col-span-full"
              label="Remember Me"
            />
          )}
        </form.AppField>
      </>
    );
  },
});
