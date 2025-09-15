import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAppForm } from "@/components/ui/form";
import { LoginForm } from "./-form";
import type { GetVariables } from "@/lib/utils";
import { SignInMutation } from "@/graphql/auth";
import { execute } from "@/lib/graphql/client/execute";

export const Route = createFileRoute("/auth/(layout)/login/")({
  component: RouteComponent,
  // beforeLoad: () => {
  //   if (pb.authStore.isValid) throw redirect({ to: '/dashboard/crm/leads' });
  // },
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/auth/login" });

  const form = useAppForm({
    defaultValues: {} as GetVariables<typeof SignInMutation>,
    onSubmit: async ({ value }) => {
      const [result, error] = await execute(SignInMutation, value);

      if (error) {
        toast.error("Operation failed", { description: error[0].message });
      }

      if (!result) throw new Error("Unexpected error");

      localStorage.setItem("graphql-token", result.auth.signInEmail.token);

      localStorage.setItem(
        "graphql-user",
        JSON.stringify(result.auth.signInEmail.user),
      );

      navigate({ to: "/dashboard" });
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
        <LoginForm form={form} />
        <form.SubmitButton className="col-span-full">Sign in</form.SubmitButton>
      </form.AppForm>
    </form>
  );
}
