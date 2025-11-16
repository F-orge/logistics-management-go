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
import { Collections, Create, TypedPocketBase } from "@/lib/pb.types";
import { OpportunitiesSchema } from "@/pocketbase/schemas/customer-relations/opportunities";

export const CreateOpportunitiesSchema = z.object({
  name: OpportunitiesSchema.shape.name.register(fieldRegistry, {
    id: "crm-opportunities-name-create",
    type: "field",
    label: "Opportunity Name",
    description: "Enter the opportunity name",
    inputType: "text",
  }),
  stage: OpportunitiesSchema.shape.stage.register(fieldRegistry, {
    id: "crm-opportunities-stage-create",
    type: "field",
    label: "Stage",
    description: "Select the stage (optional)",
    inputType: "select",
  }),
  dealValue: OpportunitiesSchema.shape.dealValue.register(fieldRegistry, {
    id: "crm-opportunities-dealValue-create",
    type: "field",
    label: "Deal Value",
    description: "Enter the deal value (optional)",
    inputType: "number",
  }),
  probability: OpportunitiesSchema.shape.probability.register(fieldRegistry, {
    id: "crm-opportunities-probability-create",
    type: "field",
    label: "Probability",
    description: "Enter the probability (0-1) (optional)",
    inputType: "number",
  }),
  expectedCloseDate: OpportunitiesSchema.shape.expectedCloseDate.register(
    fieldRegistry,
    {
      id: "crm-opportunities-expectedCloseDate-create",
      type: "field",
      label: "Expected Close Date",
      description: "Select the expected close date (optional)",
      inputType: "date",
    }
  ),
  lostReason: OpportunitiesSchema.shape.lostReason.register(fieldRegistry, {
    id: "crm-opportunities-lostReason-create",
    type: "field",
    label: "Lost Reason",
    description: "Enter the lost reason (optional)",
    inputType: "textarea",
  }),
  source: OpportunitiesSchema.shape.source.register(fieldRegistry, {
    id: "crm-opportunities-source-create",
    type: "field",
    label: "Source",
    description: "Select the source",
    inputType: "select",
  }),
  contact: OpportunitiesSchema.shape.contact.register(fieldRegistry, {
    id: "crm-opportunities-contact-create",
    type: "field",
    label: "Contact",
    description: "Select the contact (optional)",
    inputType: "text",
  }),
  company: OpportunitiesSchema.shape.company.register(fieldRegistry, {
    id: "crm-opportunities-company-create",
    type: "field",
    label: "Company",
    description: "Select the company (optional)",
    inputType: "text",
  }),
  campaign: OpportunitiesSchema.shape.campaign.register(fieldRegistry, {
    id: "crm-opportunities-campaign-create",
    type: "field",
    label: "Campaign",
    description: "Select the campaign (optional)",
    inputType: "text",
  }),
  attachments: OpportunitiesSchema.shape.attachments.register(fieldRegistry, {
    id: "crm-opportunities-attachments-create",
    type: "field",
    inputType: "file",
    label: "Attachments",
    description: "Upload attachments (optional)",
    isArray: true,
  }),
  products: OpportunitiesSchema.shape.products.register(fieldRegistry, {
    id: "crm-opportunities-products-create",
    type: "field",
    label: "Products",
    description: "Select products (optional)",
    inputType: "text",
    isArray: true,
  }),
});

const FormOption = formOptions({
  defaultValues: {} as z.infer<typeof CreateOpportunitiesSchema>,
  validators: {
    onSubmit: CreateOpportunitiesSchema,
  },
  onSubmitMeta: {} as {
    pocketbase: TypedPocketBase;
    navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  },
  onSubmit: async ({ value, meta }) => {
    try {
      await meta
        .pocketbase!.collection(Collections.CustomerRelationsOpportunities)
        .create<Create<Collections.CustomerRelationsOpportunities>>(value);

      toast.success("Opportunity created successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to create opportunity: ${error.message} (${error.status})`
        );
      }
    } finally {
      meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
    }
  },
});

const CreateOpportunitiesForm = () => {
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
          {...toAutoFormFieldSet(CreateOpportunitiesSchema)}
        />
        <DialogFooter>
          <form.SubmitButton>Create Opportunity</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default CreateOpportunitiesForm;
