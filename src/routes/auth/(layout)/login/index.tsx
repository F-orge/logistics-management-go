import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { GalleryVerticalEnd } from "lucide-react";
import { toast } from "sonner";
import { LoginForm } from "./-form";
import { useAppForm } from "@/components/ui/form";
import { orpcSafeClient } from "@/index";

export const Route = createFileRoute("/auth/(layout)/login/")({
  component: RouteComponent,
  // beforeLoad: () => {
  //   if (pb.authStore.isValid) throw redirect({ to: '/dashboard/crm/leads' });
  // },
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/auth/login" });

  const form = useAppForm({
    defaultValues: {} as ORPCInputs["auth"]["signIn"],
    onSubmit: async ({ value }) => {
      const [error, result] = await orpcSafeClient.auth.signIn(value);

      if (error) toast.error(error.name, { description: error.message });

      if (result!.redirect) navigate({ to: result!.url });

      localStorage.setItem("orpc-jwt-token", result!.token);

      navigate({ to: "/dashboard/crm/leads" });
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
        <form.SubmitButton className="col-span-full">
          Sign in
        </form.SubmitButton>
      </form.AppForm>
    </form>
  );
}
