import z from "zod";
import { withForm } from "@/components/ui/forms";
import { VehiclesSchema } from "@/pocketbase/schemas/transport-management/vehicles";

export type VehiclesFormProps = {
  action?: "create" | "edit";
};

export const VehiclesForm = withForm({
  defaultValues: {} as z.infer<typeof VehiclesSchema>,
  props: {} as VehiclesFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* registrationNumber - string */}
        {/* model - string */}
        {/* capacityVolume - number */}
        {/* capacityWeight - number */}
        {/* status - enum */}
        {/* maintenances - vehicle-maintenance (sub-table) */}
        {/* gps_pings - gps-ping (sub-table) */}
      </form.FieldSet>
    );
  },
});
