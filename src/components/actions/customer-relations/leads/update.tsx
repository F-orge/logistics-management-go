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
import { LeadsSchema } from "@/pocketbase/schemas/customer-relations/leads";
import { CreateLeadsSchema } from "./create";

export const UpdateLeadsSchema = z.object({
  name: LeadsSchema.shape.name.optional().register(fieldRegistry, {
    id: "crm-leads-name-update",
    type: "field",
    label: "Lead Name",
    description: "Enter the lead name (optional)",
    inputType: "text",
  }),
  email: LeadsSchema.shape.email.optional().register(fieldRegistry, {
    id: "crm-leads-email-update",
    type: "field",
    label: "Email",
    description: "Enter the email (optional)",
    inputType: "email",
  }),
  source: LeadsSchema.shape.source.optional().register(fieldRegistry, {
    id: "crm-leads-source-update",
    type: "field",
    label: "Source",
    description: "Select the lead source (optional)",
    inputType: "select",
  }),
  status: LeadsSchema.shape.status.optional().register(fieldRegistry, {
    id: "crm-leads-status-update",
    type: "field",
    label: "Status",
    description: "Select the status (optional)",
    inputType: "select",
  }),
  score: LeadsSchema.shape.score.optional().register(fieldRegistry, {
    id: "crm-leads-score-update",
    type: "field",
    label: "Score",
    description: "Enter the lead score",
    inputType: "number",
  }),
  campaign: LeadsSchema.shape.campaign.optional().register(fieldRegistry, {
    id: "crm-leads-campaign-update",
    type: "field",
    label: "Campaign",
    description: "Select the campaign (optional)",
    inputType: "text",
  }),
  convertedAt: LeadsSchema.shape.convertedAt
    .optional()
    .register(fieldRegistry, {
      id: "crm-leads-convertedAt-update",
      type: "field",
      label: "Converted At",
      description: "Select the conversion date (optional)",
      inputType: "date",
    }),
  convertedContact: LeadsSchema.shape.convertedContact
    .optional()
    .register(fieldRegistry, {
      id: "crm-leads-convertedContact-update",
      type: "field",
      label: "Converted Contact",
      description: "Enter the converted contact (optional)",
      inputType: "text",
    }),
  convertedCompany: LeadsSchema.shape.convertedCompany
    .optional()
    .register(fieldRegistry, {
      id: "crm-leads-convertedCompany-update",
      type: "field",
      label: "Converted Company",
      description: "Enter the converted company (optional)",
      inputType: "text",
    }),
  convertedOpportunity: LeadsSchema.shape.convertedOpportunity
    .optional()
    .register(fieldRegistry, {
      id: "crm-leads-convertedOpportunity-update",
      type: "field",
      label: "Converted Opportunity",
      description: "Enter the converted opportunity (optional)",
      inputType: "text",
    }),
});

const FormOption = formOptions({
  defaultValues: {} as z.infer<typeof UpdateLeadsSchema>,
  validators: {
    onSubmit: UpdateLeadsSchema,
  },
  onSubmitMeta: {} as {
    id: string;
    pocketbase: TypedPocketBase;
    navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  },
  onSubmit: async ({ value, meta }) => {
    try {
      await meta
        .pocketbase!.collection(Collections.CustomerRelationsLeads)
        .update(meta.id, value);

      toast.success("Lead updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to update lead: ${error.message} (${error.status})`
        );
      }
    } finally {
      meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
    }
  },
});

const UpdateLeadsForm = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data } = useQuery({
    queryKey: ["lead", searchQuery.id],
    enabled: !!searchQuery.id,
    queryFn: async () => {
      return await pocketbase
        .collection(Collections.CustomerRelationsLeads)
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
          {...toAutoFormFieldSet(UpdateLeadsSchema)}
        />
        <DialogFooter>
          <form.SubmitButton>Update Lead</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateLeadsForm;
