import z from "zod";
import { withFieldGroup } from "@/components/ui/forms";
import { PackageItemsSchema } from "@/pocketbase/schemas/warehouse-management/package-items";

export type PackageItemsFormProps = {
  action?: "create" | "edit";
};

export const PackageItemsForm = withFieldGroup({
  defaultValues: {} as z.infer<typeof PackageItemsSchema>,
  props: {} as PackageItemsFormProps,
  render: ({ group, ...props }) => {
    return (
      <group.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* package - string (relation) */}
        {/* product - string (relation) */}
        {/* quantity - number */}
      </group.FieldSet>
    );
  },
});
