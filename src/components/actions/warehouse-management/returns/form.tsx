import z from "zod";
import { withForm } from "@/components/ui/forms";
import { ReturnsSchema } from "@/pocketbase/schemas/warehouse-management/returns";

export type ReturnsFormProps = {
  action?: "create" | "edit";
};

export const ReturnsForm = withForm({
  defaultValues: {} as z.infer<typeof ReturnsSchema>,
  props: {} as ReturnsFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* returnNumber - string */}
        {/* order - string (relation) */}
        {/* returnDate - date */}
        {/* reason - enum */}
        {/* status - enum */}
        {/* notes - rich text */}
      </form.FieldSet>
    );
  },
});
