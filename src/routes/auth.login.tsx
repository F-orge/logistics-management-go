import { createFileRoute } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAppForm } from "@/components/ui/forms";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({
      redirectTo: z.string().optional(),
    })
  ),
});

function RouteComponent() {
  const { pocketbase } = Route.useRouteContext();
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

  const form = useAppForm({
    defaultValues: {} as { identity: string; password: string },
    onSubmit: async ({ value, formApi }) => {
      try {
        await pocketbase
          .collection("users")
          .authWithPassword(value.identity, value.password);
        toast.success("Logged in successfully!");

        if (searchQuery.redirectTo) {
          window.location.replace(searchQuery.redirectTo);
        } else {
          navigate({
            to: "/dashboard/$schema/$collection",
            params: { schema: "customer-relations", collection: "contacts" },
            search: { perPage: 10, page: 1 },
          });
        }
      } catch (error) {
        if (error instanceof ClientResponseError) {
          formApi.setErrorMap({ onSubmit: {fields:error.data.data} });
          toast.error(
            `Failed to login: ${error.message} (${error.status})`,
          );
        }
      }
    },
  });

  return (
    <div className="min-h-svh h-full flex justify-center items-center">
      <div className={cn("flex flex-col gap-6")}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>Login with your Credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              <form.AppForm>
                <form.FieldSet>
                  <form.AppField name="identity">
                    {(field) => (
                      <field.Field
                        label="Email"
                        description="Enter your email address"
                      >
                        <field.EmailField />
                      </field.Field>
                    )}
                  </form.AppField>
                  <form.AppField name="password">
                    {(field) => (
                      <field.Field
                        label="Password"
                        description="Enter your password"
                      >
                        <field.TextField type="password" />
                      </field.Field>
                    )}
                  </form.AppField>
                  <form.SubmitButton>Login</form.SubmitButton>
                </form.FieldSet>
              </form.AppForm>
            </form>
          </CardContent>
        </Card>
        <FieldDescription className="px-6 text-center">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </FieldDescription>
      </div>
    </div>
  );
}
