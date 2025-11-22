import z from "zod";
import { withForm } from "@/components/ui/forms";
import { LocationsSchema } from "@/pocketbase/schemas/warehouse-management/locations";

export type LocationsFormProps = {
  action?: "create" | "edit";
};

export const LocationsForm = withForm({
  defaultValues: {} as z.infer<typeof LocationsSchema>,
  props: {} as LocationsFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* warehouse - string (relation) */}
        {/* name - string */}
        {/* barcode - string */}
        {/* type - enum */}
        {/* level - number */}
        {/* maxWeight - number */}
        {/* maxVolume - number */}
        {/* maxPallets - number */}
        {/* isPickable - boolean */}
        {/* isReceivable - boolean */}
        {/* temperatureControlled - boolean */}
        {/* hazmatApproved - boolean */}
        {/* isActive - boolean */}
        {/* parentLocation - string (relation) */}
      </form.FieldSet>
    );
  },
});
