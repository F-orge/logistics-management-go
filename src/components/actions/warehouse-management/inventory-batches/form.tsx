import z from "zod";
import { withForm } from "@/components/ui/forms";
import { InventoryBatchesSchema } from "@/pocketbase/schemas/warehouse-management/inventory-batches";

export type InventoryBatchesFormProps = {
  action?: "create" | "edit";
};

export const InventoryBatchesForm = withForm({
  defaultValues: {} as z.infer<typeof InventoryBatchesSchema>,
  props: {} as InventoryBatchesFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* product - string (relation) */}
        {/* batchNumber - string */}
        {/* expirationDate - date */}
      </form.FieldSet>
    );
  },
});
