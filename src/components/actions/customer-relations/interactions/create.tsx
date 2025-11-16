import { formOptions } from "@tanstack/react-form";
import {
  UseNavigateResult,
  useNavigate,
  useRouteContext,
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

export const CreateInteractionsSchema = z.object({
  contact: InteractionsSchema.shape.contact.register(fieldRegistry, {
    id: "crm-interactions-contact-create",
    type: "field",
    label: "Contact",
    description: "Select the contact",
    inputType: "text",
  }),
  user: InteractionsSchema.shape.user.register(fieldRegistry, {
    id: "crm-interactions-user-create",
    type: "field",
    label: "User",
    description: "Select the user",
    inputType: "text",
  }),
  case: InteractionsSchema.shape.case.register(fieldRegistry, {
    id: "crm-interactions-case-create",
    type: "field",
    label: "Case",
    description: "Select the case (optional)",
    inputType: "text",
  }),
  type: InteractionsSchema.shape.type.register(fieldRegistry, {
    id: "crm-interactions-type-create",
    type: "field",
    label: "Type",
    description: "Select the interaction type (optional)",
    inputType: "select",
  }),
  outcome: InteractionsSchema.shape.outcome.register(fieldRegistry, {
    id: "crm-interactions-outcome-create",
    type: "field",
    label: "Outcome",
    description: "Enter the outcome (optional)",
    inputType: "text",
  }),
  notes: InteractionsSchema.shape.notes.register(fieldRegistry, {
    id: "crm-interactions-notes-create",
    type: "field",
    label: "Notes",
    description: "Enter notes (optional)",
    inputType: "textarea",
  }),
  attachments: InteractionsSchema.shape.attachments.register(fieldRegistry, {
    id: "crm-interactions-attachments-create",
    type: "field",
    inputType: "file",
    label: "Attachments",
    description: "Upload attachments (optional)",
    isArray: true,
  }),
  interactionDate: InteractionsSchema.shape.interactionDate.register(
    fieldRegistry,
    {
      id: "crm-interactions-interactionDate-create",
      type: "field",
      label: "Interaction Date",
      description: "Select the interaction date (optional)",
      inputType: "date",
    }
  ),
});

const FormOption = formOptions({
  defaultValues: {} as z.infer<typeof CreateInteractionsSchema>,
  validators: {
    onSubmit: CreateInteractionsSchema,
  },
  onSubmitMeta: {} as {
    pocketbase: TypedPocketBase;
    navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  },
  onSubmit: async ({ value, meta }) => {
    try {
      await meta
        .pocketbase!.collection(Collections.CustomerRelationsInteractions)
        .create(value);

      toast.success("Interaction created successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to create interaction: ${error.message} (${error.status})`
        );
      }
    } finally {
      meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
    }
  },
});

const CreateInteractionsForm = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const form = useAppForm(FormOption);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit({ navigate, pocketbase });
      }}
    >
      <form.AppForm>
        <AutoFieldSet
          form={form as any}
          {...toAutoFormFieldSet(CreateInteractionsSchema)}
        />
        <DialogFooter>
          <form.SubmitButton>Create Interaction</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default CreateInteractionsForm;
