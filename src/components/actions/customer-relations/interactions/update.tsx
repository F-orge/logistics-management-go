import { formOptions } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import {
  UseNavigateResult,
  useNavigate,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import AutoFieldSet from "@/components/ui/autoform-tanstack/auto-fieldset";
import {
  fieldRegistry,
  toAutoFormFieldSet,
} from "@/components/ui/autoform-tanstack/types";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import { Collections, TypedPocketBase } from "@/lib/pb.types";
import { InteractionsSchema } from "@/pocketbase/schemas/customer-relations/interactions";
import { CreateInteractionsSchema } from "./create";

export const UpdateInteractionsSchema = z.object({
  contact: InteractionsSchema.shape.contact.optional().register(fieldRegistry, {
    id: "crm-interactions-contact-update",
    type: "field",
    label: "Contact",
    description: "Select the contact",
    inputType: "text",
  }),
  user: InteractionsSchema.shape.user.optional().register(fieldRegistry, {
    id: "crm-interactions-user-update",
    type: "field",
    label: "User",
    description: "Select the user",
    inputType: "text",
  }),
  case: InteractionsSchema.shape.case.optional().register(fieldRegistry, {
    id: "crm-interactions-case-update",
    type: "field",
    label: "Case",
    description: "Select the case (optional)",
    inputType: "text",
  }),
  type: InteractionsSchema.shape.type.optional().register(fieldRegistry, {
    id: "crm-interactions-type-update",
    type: "field",
    label: "Type",
    description: "Select the interaction type (optional)",
    inputType: "select",
  }),
  outcome: InteractionsSchema.shape.outcome.optional().register(fieldRegistry, {
    id: "crm-interactions-outcome-update",
    type: "field",
    label: "Outcome",
    description: "Enter the outcome (optional)",
    inputType: "text",
  }),
  notes: InteractionsSchema.shape.notes.optional().register(fieldRegistry, {
    id: "crm-interactions-notes-update",
    type: "field",
    label: "Notes",
    description: "Enter notes (optional)",
    inputType: "textarea",
  }),
  interactionDate: InteractionsSchema.shape.interactionDate
    .optional()
    .register(fieldRegistry, {
      id: "crm-interactions-interactionDate-update",
      type: "field",
      label: "Interaction Date",
      description: "Select the interaction date (optional)",
      inputType: "date",
    }),
});

const FormOption = formOptions({
  defaultValues: {} as z.infer<typeof UpdateInteractionsSchema>,
  validators: {
    onSubmit: UpdateInteractionsSchema,
  },
  onSubmitMeta: {} as {
    id: string;
    pocketbase: TypedPocketBase;
    navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  },
  onSubmit: async ({ value, meta }) => {
    try {
      await meta
        .pocketbase!.collection(Collections.CustomerRelationsInteractions)
        .update(meta.id, value);

      toast.success("Interaction updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to update interaction: ${error.message} (${error.status})`
        );
      }
    } finally {
      meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
    }
  },
});

const UpdateInteractionsForm = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data } = useQuery({
    queryKey: ["interaction", searchQuery.id],
    enabled: !!searchQuery.id,
    queryFn: async () => {
      return await pocketbase
        .collection(Collections.CustomerRelationsInteractions)
        .getOne(searchQuery.id!);
    },
  });

  const form = useAppForm({
    ...FormOption,
    defaultValues: data || {},
  });

  if (!data) return null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit({ id: searchQuery.id!, navigate, pocketbase });
      }}
    >
      <form.AppForm>
        <AutoFieldSet
          form={form as any}
          {...toAutoFormFieldSet(UpdateInteractionsSchema)}
        />
        <DialogFooter>
          <form.SubmitButton>Update Interaction</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateInteractionsForm;
