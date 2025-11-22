import z from "zod";
import { withFieldGroup } from "@/components/ui/forms";
import { SalesOrderItemsSchema } from "@/pocketbase/schemas/warehouse-management/sales-order-items";

export type SalesOrderItemsFormProps = {
  action?: "create" | "edit";
};

export const SalesOrderItemsForm = withFieldGroup({
  defaultValues: {} as z.infer<typeof SalesOrderItemsSchema>,
  props: {} as SalesOrderItemsFormProps,
  render: ({ group, ...props }) => {
    return (
      <group.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* order - string (relation) */}
        {/* product - string (relation) */}
        {/* quantity - number */}
        {/* unitPrice - number */}
        {/* lineTotal - number */}
      </group.FieldSet>
    );
  },
});
