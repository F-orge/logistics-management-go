import { createFileRoute, redirect } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { toast } from "sonner";
import z from "zod";
import { AutoForm } from "@packages/ui/components/ui/autoform/index";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldTitle,
} from "@packages/ui/components/ui/field";
import { authClient } from "@/lib/auth";
import { Button } from "@packages/ui/components/ui/button";

const ResetPasswordForm = z
  .object({
    newPassword: z.string(),
    confirmPassword: z.string(),
  })
  .refine((args) => args.newPassword === args.confirmPassword, {
    error: "Password does not match",
    path: ["confirmPassword", "newPassword"],
  });

export const Route = createFileRoute("/auth/reset-password/")({
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({ token: z.string().optional(), email: z.email().optional() })
  ),
  beforeLoad: (ctx) => {
    if (!ctx.search.token && !ctx.search.email)
      throw redirect({ to: "/auth/login" });
  },
});

function RouteComponent() {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

  if (!searchQuery.token && searchQuery.email) {
    return (
      <FieldGroup>
        <FieldLegend className="flex flex-col items-center gap-1 text-center">
          <FieldTitle className="text-2xl font-bold">Password reset</FieldTitle>
          <FieldDescription className="text-muted-foreground text-sm text-balance">
            The reset link has been send to your email: {searchQuery.email}
          </FieldDescription>
        </FieldLegend>
      </FieldGroup>
    );
  }

  return (
    <FieldGroup>
      <FieldLegend className="flex flex-col items-center gap-1 text-center">
        <FieldTitle className="text-2xl font-bold">Password reset</FieldTitle>
        <FieldDescription className="text-muted-foreground text-sm text-balance">
          Enter your new password below to secure your account
        </FieldDescription>
      </FieldLegend>
      <AutoForm
        schema={ResetPasswordForm}
        onSubmit={(value) =>
          toast.promise(
            authClient.resetPassword({
              token: searchQuery.token,
              newPassword: value.newPassword,
            }),
            {
              success: ({ data }) => {
                if (data?.status) {
                  navigate({ to: "/auth/login" });
                  return "Successfully changed password";
                } else {
                  return "Unable to update your password";
                }
              },
              error: "Unable to update your password",
            }
          )
        }
      >
        <Field>
          <Button type="submit">Save</Button>
        </Field>
      </AutoForm>
    </FieldGroup>
  );
}
