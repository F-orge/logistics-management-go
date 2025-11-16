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
  fieldSetRegistry,
  toAutoFormFieldSet,
} from "@/components/ui/autoform-tanstack/types";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import { Collections, Create, TypedPocketBase } from "@/lib/pb.types";
import { OpportunityProductsSchema } from "@/pocketbase/schemas/customer-relations";
import { OpportunitiesSchema } from "@/pocketbase/schemas/customer-relations/opportunities";

const CreateItemSchema = z
  .object({
    product: OpportunityProductsSchema.shape.product.register(fieldRegistry, {
      id: "customer-relations-opportunity-products-product-create",
      type: "field",
      label: "Product",
      description: "Enter a product",
      inputType: "relation",
      props: {
        collectionName: Collections.CustomerRelationsProducts,
        displayField: "name",
        relationshipName: "product",
      },
    }),
    quantity: OpportunityProductsSchema.shape.quantity.register(fieldRegistry, {
      id: "customer-relations-opportunity-products-quantity-create",
      type: "field",
      label: "Quantity",
      description: "Enter a quantity",
      inputType: "number",
    }),
  })
  .register(fieldSetRegistry, {
    legend: "Products",
    description: "Add products to the opportunity",
  });

export const CreateSchema = z.object({
  name: OpportunitiesSchema.shape.name.register(fieldRegistry, {
    id: "customer-relations-opportunities-name-create",
    type: "field",
    label: "Name",
    description: "Enter a name",
    inputType: "text",
  }),
  stage: OpportunitiesSchema.shape.stage.register(fieldRegistry, {
    id: "customer-relations-opportunities-stage-create",
    type: "field",
    label: "Stage",
    description: "Enter a stage",
    inputType: "select",
  }),
  dealValue: OpportunitiesSchema.shape.dealValue.register(fieldRegistry, {
    id: "customer-relations-opportunities-dealValue-create",
    type: "field",
    label: "DealValue",
    description: "Enter a dealvalue",
    inputType: "number",
  }),
  probability: OpportunitiesSchema.shape.probability.register(fieldRegistry, {
    id: "customer-relations-opportunities-probability-create",
    type: "field",
    label: "Probability",
    description: "Enter a probability",
    inputType: "number",
  }),
  expectedCloseDate: OpportunitiesSchema.shape.expectedCloseDate.register(
    fieldRegistry,
    {
      id: "customer-relations-opportunities-expectedCloseDate-create",
      type: "field",
      label: "ExpectedCloseDate",
      description: "Enter an expectedclosedate",
      inputType: "date",
    }
  ),
  source: OpportunitiesSchema.shape.source.register(fieldRegistry, {
    id: "customer-relations-opportunities-source-create",
    type: "field",
    label: "Source",
    description: "Enter a source",
    inputType: "select",
  }),
  contact: OpportunitiesSchema.shape.contact.register(fieldRegistry, {
    id: "customer-relations-opportunities-contact-create",
    type: "field",
    label: "Contact",
    description: "Enter a contact",
    inputType: "relation",
    props: {
      collectionName: Collections.CustomerRelationsContacts,
      displayField: "name",
      relationshipName: "contact",
    },
  }),
  company: OpportunitiesSchema.shape.company.register(fieldRegistry, {
    id: "customer-relations-opportunities-company-create",
    type: "field",
    label: "Company",
    description: "Enter a company",
    inputType: "relation",
    props: {
      collectionName: Collections.CustomerRelationsCompanies,
      displayField: "name",
      relationshipName: "company",
    },
  }),
  campaign: OpportunitiesSchema.shape.campaign.register(fieldRegistry, {
    id: "customer-relations-opportunities-campaign-create",
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
  products: CreateItemSchema.array(),
});

const FormOption = formOptions({
  defaultValues: {} as z.infer<typeof CreateSchema>,
  validators: {
    onSubmit: CreateSchema,
  },
  onSubmitMeta: {} as {
    pocketbase: TypedPocketBase;
    navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  },
  onSubmit: async ({ value, meta }) => {
    try {
      const { products, ...opportunityData } = value;

      const opportunity = await meta
        .pocketbase!.collection(Collections.CustomerRelationsOpportunities)
        .create<Create<Collections.CustomerRelationsOpportunities>>({
          ...opportunityData,
          owner: meta.pocketbase!.authStore.record?.id,
        });

      const batch = meta.pocketbase!.createBatch();

      for (const item of products) {
        batch
          .collection(Collections.CustomerRelationsOpportunityProducts)
          .create({
            opportunity: opportunity.id,
            product: item.product,
            quantity: item.quantity,
          } as Create<Collections.CustomerRelationsOpportunityProducts>);
      }

      await batch.send();

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
          {...toAutoFormFieldSet(CreateSchema)}
        />
        <DialogFooter>
          <form.SubmitButton>Create Opportunity</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default CreateOpportunitiesForm;
