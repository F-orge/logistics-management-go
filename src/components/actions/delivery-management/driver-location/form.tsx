import z from "zod";
import { withForm } from "@/components/ui/forms";
import { DriverLocationSchema } from "@/pocketbase/schemas/delivery-management/driver-location";

export type DriverLocationFormProps = {
  action?: "create" | "edit";
};

export const DriverLocationForm = withForm({
  defaultValues: {} as z.infer<typeof DriverLocationSchema>,
  props: {} as DriverLocationFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* driver - string (relation) */}
        {/* coordinates - json */}
        {/* heading - json */}
        {/* timestamp - datetime */}
      </form.FieldSet>
    );
  },
});
