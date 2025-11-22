import z from "zod";
import { withForm } from "@/components/ui/forms";
import { LeadsSchema } from "@/pocketbase/schemas/customer-relations";

export type LeadsFormProps = {
  action?: "create" | "edit";
};

export const LeadsForm = withForm({
  defaultValues: {} as z.infer<typeof LeadsSchema>,
  props: {} as LeadsFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* name - string */}
        {/* email - string */}
        {/* source - enum */}
        {/* status - enum */}
        {/* score - number */}
        {/* owner - string (relation) */}
        {/* campaign - string (relation) */}
        {/* convertedAt - date */}
        {/* convertedContact - string (relation) */}
        {/* convertedCompany - string (relation) */}
        {/* convertedOpportunity - string (relation) */}
        {/* attachments - file array */}
      </form.FieldSet>
    );
  },
});
