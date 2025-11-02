import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { AutoForm } from "@packages/ui/components/ui/autoform/index";
import { Button } from "@packages/ui/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@packages/ui/components/ui/field";
import z from "zod";
import { fieldConfig } from "@autoform/zod";

export const ResetPasswordComponent = () => {
  return (
    <div className="flex gap-2.5 justify-between w-full">
      <FieldLabel>Password</FieldLabel>
      <Button variant={"link"} size={"sm"} className="p-0" asChild>
        <Link to="/auth/forgot-password">Forgot password?</Link>
      </Button>
    </div>
  );
};

export const LoginFormSchema = z.object({
  email: z.email().check(
    fieldConfig({
      label: "Email address",
      description: "Enter your email address",
    })
  ),
  password: z.string().check(
    fieldConfig({
      label: <ResetPasswordComponent />,
      description: "Enter your password",
      inputProps: { type: "password" },
    })
  ),
  rememberMe: z
    .boolean()
    .optional()
    .check(fieldConfig({ label: "Remember Me" })),
});

export const Route = createFileRoute("/auth/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const { authClient } = Route.useRouteContext();

  return (
    <FieldGroup>
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <AutoForm
        schema={LoginFormSchema}
        onSubmit={(value) => {
          toast.promise(
            authClient.signIn.email({
              email: value.email,
              password: value.password,
              rememberMe: value.rememberMe,
            }),
            {
              success: ({ data, error }) => {
                if (error) {
                  toast.error(error.message);
                  if (error.message === "Email not verified") {
                    navigate({
                      to: "/auth/verify-email",
                      search: { email: value.email },
                    });
                  }
                }

                if (data !== null && data?.redirect) {
                  navigate({ to: data.url });
                }

                if (data !== null && data.user) {
                  navigate({
                    to: "/dashboard/$schema/$table",
                    params: { schema: "crm", table: "leads" },
                  });
                  return "Successfully logged in";
                }
              },
            }
          );
        }}
      >
        <Field>
          <Button type="submit">Login</Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link to="/auth/signup" className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </AutoForm>
    </FieldGroup>
  );
}
