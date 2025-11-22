import z from "zod";
import { withForm } from "@/components/ui/forms";
import { OpportunitiesSchema } from "@/pocketbase/schemas/customer-relations";

export type OpportunitiesFormProps = {
  action?: "create" | "edit";
};

export const OpportunitiesForm = withForm({
  defaultValues: {} as z.infer<typeof OpportunitiesSchema>,
  props: {} as OpportunitiesFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* name - string */}
        {/* stage - enum */}
        {/* dealValue - number */}
        {/* probability - number */}
        {/* expectedCloseDate - date */}
        {/* lostReason - string */}
        {/* source - enum */}
        {/* owner - string (relation) */}
        {/* contact - string (relation) */}
        {/* company - string (relation) */}
        {/* campaign - string (relation) */}
        {/* products - opportunity-products (sub-table) */}
        {/* attachments - file array */}
      </form.FieldSet>
    );
  },
});
