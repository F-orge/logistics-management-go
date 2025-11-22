import z from "zod";
import { withForm } from "@/components/ui/forms";
import { InteractionsSchema } from "@/pocketbase/schemas/customer-relations";

export type InteractionsFormProps = {
  action?: "create" | "edit";
};

export const InteractionsForm = withForm({
  defaultValues: {} as z.infer<typeof InteractionsSchema>,
  props: {} as InteractionsFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* contact - string (relation) */}
        {/* user - string (relation) */}
        {/* case - string (relation) */}
        {/* type - enum */}
        {/* outcome - string */}
        {/* notes - string */}
        {/* interactionDate - date */}
        {/* attachments - file array */}
      </form.FieldSet>
    );
  },
});
