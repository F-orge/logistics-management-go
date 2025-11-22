import z from "zod";
import { withForm } from "@/components/ui/forms";
import { PackagesSchema } from "@/pocketbase/schemas/warehouse-management/packages";

export type PackagesFormProps = {
  action?: "create" | "edit";
};

export const PackagesForm = withForm({
  defaultValues: {} as z.infer<typeof PackagesSchema>,
  props: {} as PackagesFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* packageNumber - string */}
        {/* shipment - string (relation) */}
        {/* weight - number */}
        {/* dimensions - json */}
        {/* barcode - string */}
        {/* status - enum */}
      </form.FieldSet>
    );
  },
});
