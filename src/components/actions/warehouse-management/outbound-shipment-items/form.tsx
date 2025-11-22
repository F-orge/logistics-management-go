import z from "zod";
import { withFieldGroup } from "@/components/ui/forms";
import { OutboundShipmentItemsSchema } from "@/pocketbase/schemas/warehouse-management/outbound-shipment-items";

export type OutboundShipmentItemsFormProps = {
  action?: "create" | "edit";
};

export const OutboundShipmentItemsForm = withFieldGroup({
  defaultValues: {} as z.infer<typeof OutboundShipmentItemsSchema>,
  props: {} as OutboundShipmentItemsFormProps,
  render: ({ group, ...props }) => {
    return (
      <group.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* shipment - string (relation) */}
        {/* product - string (relation) */}
        {/* quantity - number */}
        {/* pickedQuantity - number */}
        {/* packedQuantity - number */}
      </group.FieldSet>
    );
  },
});
