import z from "zod";
import { withForm } from "@/components/ui/forms";
import { SuppliersSchema } from "@/pocketbase/schemas/warehouse-management/suppliers";

export type SuppliersFormProps = {
  action?: "create" | "edit";
};

export const SuppliersForm = withForm({
  defaultValues: {} as z.infer<typeof SuppliersSchema>,
  props: {} as SuppliersFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* name - string */}
        {/* contactPerson - string */}
        {/* email - string */}
        {/* phoneNumber - string */}
        {/* client - string (relation) */}
      </form.FieldSet>
    );
  },
});
