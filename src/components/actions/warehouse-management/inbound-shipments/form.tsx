import z from "zod";
import { withForm } from "@/components/ui/forms";
import { InboundShipmentsSchema } from "@/pocketbase/schemas/warehouse-management/inbound-shipments";

export type InboundShipmentsFormProps = {
  action?: "create" | "edit";
};

export const InboundShipmentsForm = withForm({
  defaultValues: {} as z.infer<typeof InboundShipmentsSchema>,
  props: {} as InboundShipmentsFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* shipmentNumber - string */}
        {/* supplier - string (relation) */}
        {/* warehouse - string (relation) */}
        {/* expectedArrival - date */}
        {/* actualArrival - date */}
        {/* status - enum */}
        {/* notes - rich text */}
      </form.FieldSet>
    );
  },
});
