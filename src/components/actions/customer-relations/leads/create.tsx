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
import { LeadsSchema } from "@/pocketbase/schemas/customer-relations/leads";

export const CreateSchema = z.object({
  name: LeadsSchema.shape.name.register(fieldRegistry, {
    id: "customer-relations-leads-name-create",
    type: "field",
    label: "Name",
    description: "Enter a name",
    inputType: "text",
  }),
  email: LeadsSchema.shape.email.register(fieldRegistry, {
    id: "customer-relations-leads-email-create",
    type: "field",
    label: "Email",
    description: "Enter an email",
    inputType: "text",
  }),
  source: LeadsSchema.shape.source.register(fieldRegistry, {
    id: "customer-relations-leads-source-create",
    type: "field",
    label: "Source",
    description: "Enter a source",
    inputType: "select",
  }),
  status: LeadsSchema.shape.status.register(fieldRegistry, {
    id: "customer-relations-leads-status-create",
    type: "field",
    label: "Status",
    description: "Enter a status",
    inputType: "select",
  }),
  score: LeadsSchema.shape.score.register(fieldRegistry, {
    id: "customer-relations-leads-score-create",
    type: "field",
    label: "Score",
    description: "Enter a score",
    inputType: "number",
  }),
  campaign: LeadsSchema.shape.campaign.register(fieldRegistry, {
    id: "customer-relations-leads-campaign-create",
    type: "field",
    label: "Campaign",
    description: "Enter a campaign",
    inputType: "relation",
    props: {
      collectionName: Collections.CustomerRelationsCampaigns,
      displayField: "name",
      relationshipName: "campaign",
    },
  }),
});

const FormOption = formOptions({
  defaultValues: {
    status: "new",
  } as z.infer<typeof CreateSchema>,
  validators: {
    onSubmit: CreateSchema,
  },
  onSubmitMeta: {} as {
    pocketbase: TypedPocketBase;
    navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  },
  onSubmit: async ({ value, meta }) => {
    try {
      await meta
        .pocketbase!.collection(Collections.CustomerRelationsLeads)
        .create({
          ...value,
          owner: meta.pocketbase!.authStore.record?.id,
        });

      toast.success("Lead created successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to create lead: ${error.message} (${error.status})`
        );
      }
    } finally {
      meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
    }
  },
});

const CreateLeadsForm = () => {
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
          {...toAutoFormFieldSet(CreateSchema)}
        />
        <DialogFooter>
          <form.SubmitButton>Create Lead</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default CreateLeadsForm;
