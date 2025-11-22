import z from "zod";
import { withForm } from "@/components/ui/forms";
import { CompaniesSchema } from "@/pocketbase/schemas/customer-relations";

export type CompaniesFormProps = {
  action?: "create" | "edit";
};

export const CompaniesForm = withForm({
  defaultValues: {} as z.infer<typeof CompaniesSchema>,
  props: {} as CompaniesFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* name - string */}
        {/* street - string */}
        {/* city - string */}
        {/* state - string */}
        {/* postalCode - string */}
        {/* country - string */}
        {/* phoneNumber - string */}
        {/* industry - string */}
        {/* website - string */}
        {/* annualRevenue - number */}
        {/* owner - string (relation) */}
        {/* attachments - file array */}
      </form.FieldSet>
    );
  },
});
