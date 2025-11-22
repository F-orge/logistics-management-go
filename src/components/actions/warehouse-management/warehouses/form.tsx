import z from "zod";
import { withForm } from "@/components/ui/forms";
import { WarehousesSchema } from "@/pocketbase/schemas/warehouse-management/warehouses";

export type WarehousesFormProps = {
  action?: "create" | "edit";
};

export const WarehousesForm = withForm({
  defaultValues: {} as z.infer<typeof WarehousesSchema>,
  props: {} as WarehousesFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* name - string */}
        {/* address - string */}
        {/* city - string */}
        {/* state - string */}
        {/* postalCode - string */}
        {/* country - string */}
        {/* timezone - string */}
        {/* contactPerson - string */}
        {/* contactEmail - string */}
        {/* contactPhone - string */}
        {/* isActive - boolean */}
        {/* images - file array */}
        {/* location - json */}
      </form.FieldSet>
    );
  },
});
