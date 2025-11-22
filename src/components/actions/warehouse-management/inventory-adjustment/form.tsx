import z from "zod";
import { withForm } from "@/components/ui/forms";
import { InventoryAdjustmentSchema } from "@/pocketbase/schemas/warehouse-management/inventory-adjustment";

export type InventoryAdjustmentFormProps = {
  action?: "create" | "edit";
};

export const InventoryAdjustmentForm = withForm({
  defaultValues: {} as z.infer<typeof InventoryAdjustmentSchema>,
  props: {} as InventoryAdjustmentFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* product - string (relation) */}
        {/* user - string (relation) */}
        {/* quantityChange - number */}
        {/* reason - enum */}
        {/* notes - rich text */}
        {/* warehouse - string (relation) */}
      </form.FieldSet>
    );
  },
});
