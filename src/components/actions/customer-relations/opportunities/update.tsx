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
import { OpportunitiesSchema } from "@/pocketbase/schemas/customer-relations/opportunities";
import { CreateOpportunitiesSchema } from "./create";

export const UpdateOpportunitiesSchema = z.object({
  name: OpportunitiesSchema.shape.name.optional().register(fieldRegistry, {
    id: "crm-opportunities-name-update",
    type: "field",
    label: "Opportunity Name",
    description: "Enter the opportunity name",
    inputType: "text",
  }),
  stage: OpportunitiesSchema.shape.stage.optional().register(fieldRegistry, {
    id: "crm-opportunities-stage-update",
    type: "field",
    label: "Stage",
    description: "Select the stage (optional)",
    inputType: "select",
  }),
  dealValue: OpportunitiesSchema.shape.dealValue
    .optional()
    .register(fieldRegistry, {
      id: "crm-opportunities-dealValue-update",
      type: "field",
      label: "Deal Value",
      description: "Enter the deal value (optional)",
      inputType: "number",
    }),
  probability: OpportunitiesSchema.shape.probability
    .optional()
    .register(fieldRegistry, {
      id: "crm-opportunities-probability-update",
      type: "field",
      label: "Probability",
      description: "Enter the probability (0-1) (optional)",
      inputType: "number",
    }),
  expectedCloseDate: OpportunitiesSchema.shape.expectedCloseDate
    .optional()
    .register(fieldRegistry, {
      id: "crm-opportunities-expectedCloseDate-update",
      type: "field",
      label: "Expected Close Date",
      description: "Select the expected close date (optional)",
      inputType: "date",
    }),
  lostReason: OpportunitiesSchema.shape.lostReason
    .optional()
    .register(fieldRegistry, {
      id: "crm-opportunities-lostReason-update",
      type: "field",
      label: "Lost Reason",
      description: "Enter the lost reason (optional)",
      inputType: "textarea",
    }),
  source: OpportunitiesSchema.shape.source.optional().register(fieldRegistry, {
    id: "crm-opportunities-source-update",
    type: "field",
    label: "Source",
    description: "Select the source",
    inputType: "select",
  }),
  contact: OpportunitiesSchema.shape.contact
    .optional()
    .register(fieldRegistry, {
      id: "crm-opportunities-contact-update",
      type: "field",
      label: "Contact",
      description: "Select the contact (optional)",
      inputType: "text",
    }),
  company: OpportunitiesSchema.shape.company
    .optional()
    .register(fieldRegistry, {
      id: "crm-opportunities-company-update",
      type: "field",
      label: "Company",
      description: "Select the company (optional)",
      inputType: "text",
    }),
  campaign: OpportunitiesSchema.shape.campaign
    .optional()
    .register(fieldRegistry, {
      id: "crm-opportunities-campaign-update",
      type: "field",
      label: "Campaign",
      description: "Select the campaign (optional)",
      inputType: "text",
    }),
});

const FormOption = formOptions({
  defaultValues: {} as z.infer<typeof UpdateOpportunitiesSchema>,
  validators: {
    onSubmit: UpdateOpportunitiesSchema,
  },
  onSubmitMeta: {} as {
    id: string;
    pocketbase: TypedPocketBase;
    navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  },
  onSubmit: async ({ value, meta }) => {
    try {
      await meta
        .pocketbase!.collection(Collections.CustomerRelationsOpportunities)
        .update(meta.id, value);

      toast.success("Opportunity updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to update opportunity: ${error.message} (${error.status})`
        );
      }
    } finally {
      meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
    }
  },
});

const UpdateOpportunitiesForm = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data } = useQuery({
    queryKey: ["opportunity", searchQuery.id],
    enabled: !!searchQuery.id,
    queryFn: async () => {
      return await pocketbase
        .collection(Collections.CustomerRelationsOpportunities)
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
          {...toAutoFormFieldSet(UpdateOpportunitiesSchema)}
        />
        <DialogFooter>
          <form.SubmitButton>Update Opportunity</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateOpportunitiesForm;
