import z from "zod";
import { withForm } from "@/components/ui/forms";
import { CarriersSchema } from "@/pocketbase/schemas/transport-management/carriers";

export type CarriersFormProps = {
  action?: "create" | "edit";
};

export const CarriersForm = withForm({
  defaultValues: {} as z.infer<typeof CarriersSchema>,
  props: {} as CarriersFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* name - string */}
        {/* contactDetails - rich text */}
        {/* serviceOffered - rich text */}
        {/* image - file */}
      </form.FieldSet>
    );
  },
});
