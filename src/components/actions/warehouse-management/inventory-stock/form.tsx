import z from "zod";
import { withForm } from "@/components/ui/forms";
import { InventoryStockSchema } from "@/pocketbase/schemas/warehouse-management/inventory-stock";

export type InventoryStockFormProps = {
  action?: "create" | "edit";
};

export const InventoryStockForm = withForm({
  defaultValues: {} as z.infer<typeof InventoryStockSchema>,
  props: {} as InventoryStockFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* location - string (relation) */}
        {/* product - string (relation) */}
        {/* batch - string (relation) */}
        {/* quantity - number */}
        {/* reservedQuantity - number */}
        {/* status - enum */}
        {/* lastCountedAt - date */}
        {/* lastMovementAt - date */}
      </form.FieldSet>
    );
  },
});
