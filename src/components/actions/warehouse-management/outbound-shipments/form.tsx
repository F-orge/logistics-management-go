import z from "zod";
import { withForm } from "@/components/ui/forms";
import { OutboundShipmentsSchema } from "@/pocketbase/schemas/warehouse-management/outbound-shipments";

export type OutboundShipmentsFormProps = {
  action?: "create" | "edit";
};

export const OutboundShipmentsForm = withForm({
  defaultValues: {} as z.infer<typeof OutboundShipmentsSchema>,
  props: {} as OutboundShipmentsFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* shipmentNumber - string */}
        {/* order - string (relation) */}
        {/* warehouse - string (relation) */}
        {/* shippedDate - date */}
        {/* estimatedDelivery - date */}
        {/* status - enum */}
        {/* carrier - string (relation) */}
        {/* trackingNumber - string */}
      </form.FieldSet>
    );
  },
});
