import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAppForm } from "@/components/ui/form";
import { RegisterForm } from "./-form";
import type { GetVariables } from "@/lib/utils";
import { SignUpMutation } from "@/graphql/auth";
import { execute } from "@/lib/graphql/client/execute";

export const Route = createFileRoute("/auth/(layout)/register/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/auth/register" });

  const form = useAppForm({
    defaultValues: {} as GetVariables<typeof SignUpMutation> & {
      confirmPassword: string;
    },
    onSubmit: async ({ value }) => {
      const [result, error] = await execute(SignUpMutation, value);

      if (value.password !== value.confirmPassword) {
        toast.error("Invalid Input", {
          description: "Password does not match",
        });
      }

      if (error) toast.error(error.name, { description: error.message });

      if (!result) throw new Error("Unexpected error");

      navigate({ to: "/auth/login" });
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
