import z from "zod";
import { withForm } from "@/components/ui/forms";
import { ProofOfDeliveriesSchema } from "@/pocketbase/schemas/delivery-management/proof-of-deliveries";

export type ProofOfDeliveriesFormProps = {
  action?: "create" | "edit";
};

export const ProofOfDeliveriesForm = withForm({
  defaultValues: {} as z.infer<typeof ProofOfDeliveriesSchema>,
  props: {} as ProofOfDeliveriesFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* task - string (relation) */}
        {/* signatureData - file */}
        {/* recipientName - string */}
        {/* coordinates - json */}
        {/* timestamp - datetime */}
      </form.FieldSet>
    );
  },
});
