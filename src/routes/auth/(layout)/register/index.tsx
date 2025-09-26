import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAppForm } from "@/components/ui/form";
import { signUpEmailMutation } from "@/queries/auth";
import { RegisterForm } from "./-form";
import type { SignUpEmailInput } from "@/lib/graphql/client/graphql";
import { useMutation } from "@tanstack/react-query";

export const Route = createFileRoute("/auth/(layout)/register/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/auth/register" });

  const mutation = useMutation(signUpEmailMutation);

  const form = useAppForm({
    defaultValues: {} as SignUpEmailInput & {
      confirmPassword: string;
    },
    onSubmit: async ({ value }) =>
      mutation.mutateAsync(value, {
        onSuccess: () => navigate({ to: "/auth/login" }),
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
        <RegisterForm form={form} />
        <form.SubmitButton className="col-span-full">
          Register
        </form.SubmitButton>
      </form.AppForm>
    </form>
  );
}
