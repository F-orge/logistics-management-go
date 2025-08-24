import { toast } from "sonner";
import { withForm } from "../ui/form";
import { pb } from "@/pocketbase";
import { useNavigate } from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";

export const LoginForm = withForm({
  defaultValues: {} as { email: string; password: string },

  render: function ({ form }) {
    return (
      <>
        <form.AppField name="email">
          {(field) => <field.TextField label="Email" type="email" />}
        </form.AppField>
        <form.AppField name="password">
          {(field) => <field.TextField label="Password" type="password" />}
        </form.AppField>
      </>
    );
  },
});
