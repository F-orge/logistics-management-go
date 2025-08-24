import { LoginForm } from "@/components/forms/auth";
import { useAppForm } from "@/components/ui/form";
import { pb } from "@/pocketbase";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { GalleryVerticalEnd } from "lucide-react";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  beforeLoad: () => {
    if (pb.authStore.isValid) throw redirect({ to: "/dashboard/crm/leads" });
  },
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/login" });

  const form = useAppForm({
    defaultValues: {} as { email: string; password: string },
    onSubmit: async ({ value }) => {
      await toast.promise(
        pb.collection("users").authWithPassword(
          value.email,
          value.password,
        ),
        {
          success: "Login Successful",
          error: (err) => {
            if (err instanceof ClientResponseError) {
              switch (err.status) {
                case 400:
                  return "Invalid email or password";
                default:
                  return "Internal server error";
              }
            }
          },
        },
      ).unwrap();

      navigate({ to: "/dashboard/crm/leads" });
    },
  });

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col gap-2.5 w-full max-w-xs">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              <form.AppForm>
                <LoginForm form={form} />
                <form.SubmitButton>Sign in</form.SubmitButton>
              </form.AppForm>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
