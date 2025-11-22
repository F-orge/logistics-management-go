import z from "zod";
import { withFieldGroup } from "@/components/ui/forms";
import { InboundShipmentItemsSchema } from "@/pocketbase/schemas/warehouse-management/inbound-shipment-items";

export type InboundShipmentItemsFormProps = {
  action?: "create" | "edit";
};

export const InboundShipmentItemsForm = withFieldGroup({
  defaultValues: {} as z.infer<typeof InboundShipmentItemsSchema>,
  props: {} as InboundShipmentItemsFormProps,
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
        {/* receivedQuantity - number */}
        {/* unitPrice - number */}
      </group.FieldSet>
    );
  },
});
