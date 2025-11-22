import z from "zod";
import { withForm } from "@/components/ui/forms";
import { DriversSchema } from "@/pocketbase/schemas/transport-management/drivers";

export type DriversFormProps = {
  action?: "create" | "edit";
};

export const DriversForm = withForm({
  defaultValues: {} as z.infer<typeof DriversSchema>,
  props: {} as DriversFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* user - string (relation) */}
        {/* licenseNumber - string */}
        {/* licenseExpiryDate - date */}
        {/* status - enum */}
        {/* schedules - driver-schedules (sub-table) */}
      </form.FieldSet>
    );
  },
});
