import z from "zod";
import { withFieldGroup } from "@/components/ui/forms";
import { ReturnItemsSchema } from "@/pocketbase/schemas/warehouse-management/return-items";

export type ReturnItemsFormProps = {
  action?: "create" | "edit";
};

export const ReturnItemsForm = withFieldGroup({
  defaultValues: {} as z.infer<typeof ReturnItemsSchema>,
  props: {} as ReturnItemsFormProps,
  render: ({ group, ...props }) => {
    return (
      <group.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* return - string (relation) */}
        {/* product - string (relation) */}
        {/* quantity - number */}
        {/* conditionStatus - enum */}
      </group.FieldSet>
    );
  },
});
